import { AxiosInstance } from 'axios';

import { ACCESS_TOKEN_KEY } from '../../config/constants/local-storage';

export const useRequestAccessTokenInterceptor = (axios: AxiosInstance) => {
    axios.interceptors.request.use((request) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

        if (accessToken) {
            request.headers.Authorization = `Bearer ${accessToken}`;
        }

        return request;
    });
};
