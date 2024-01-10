import axios from 'axios';

import { useRequestAccessTokenInterceptor } from './interceptors/request-access-token.interceptor';
import { useResponseErrorInterceptor } from './interceptors/response-error.interceptor';
import { useResponseOAuthInterceptor } from './interceptors/response-oauth.interceptor';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_PROXY,
});

useRequestAccessTokenInterceptor(apiClient);
useResponseErrorInterceptor(apiClient);
useResponseOAuthInterceptor(apiClient);

export const authClient = axios.create({
    baseURL: import.meta.env.VITE_API_PROXY,
});

useRequestAccessTokenInterceptor(authClient);
