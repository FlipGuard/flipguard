import { AxiosError, AxiosInstance } from 'axios';

import { ACCESS_TOKEN_KEY } from '../../config/constants/local-storage';
import { refreshAccessToken } from '../requests/auth';

export const useResponseOAuthInterceptor = (axios: AxiosInstance) => {
    let tokenIsBeingRefreshed = false;
    let pausedRequests: (() => unknown)[] = [];

    axios.interceptors.response.use(undefined, async (error: AxiosError) => {
        const request = error.config;
        if (!request) {
            return Promise.reject(error);
        }

        if (tokenIsBeingRefreshed) {
            return new Promise((resolve) => pausedRequests.push(() => resolve(axios(request))));
        }

        const status = error.response?.status;
        if (status === 401) {
            try {
                tokenIsBeingRefreshed = true;
                const accessToken = await refreshAccessToken();
                localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
                return await axios(request);
            } catch (err) {
                return Promise.reject(error);
            } finally {
                tokenIsBeingRefreshed = false;
                pausedRequests.forEach((cb) => cb());
                pausedRequests = [];
            }
        }

        return Promise.reject(error);
    });
};
