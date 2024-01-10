import { AccessTokenRefreshResponse, UserDetails } from '@flipguard/webapp-api';
import { isAxiosError } from 'axios';

import { ACCESS_TOKEN_KEY } from '../../config/constants/local-storage';
import { apiClient, authClient } from '../http-client';

export const logout = async () => {
    await authClient.post('/auth/logout').catch(() => {});
    const hasAccessToken = !!localStorage.getItem(ACCESS_TOKEN_KEY);
    if (hasAccessToken) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        window.location.reload();
    }
};

export const refreshAccessToken = async (): Promise<string> => {
    try {
        const url = '/auth/refresh';
        const response = await authClient.post<AccessTokenRefreshResponse>(url, undefined, { withCredentials: true });
        return response.data.accessToken;
    } catch (err) {
        if (isAxiosError(err) && err.response?.status === 401) {
            await logout();
        }
        throw err;
    }
};

export const deactivateAccount = async () => {
    await apiClient.post('/auth/deactivate');
};

export const unlinkTwitterAccount = async () => {
    const response = await apiClient.post<UserDetails>('/auth/twitter/unlink');
    return response.data;
};
