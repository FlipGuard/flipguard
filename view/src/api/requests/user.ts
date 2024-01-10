import { AutobuySale } from '@flipguard/domain';
import { UserDetails, UserSettings } from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const UserQueryKeys = {
    all: ['user-details'] as const,
    me: () => [...UserQueryKeys.all, 'me'] as const,
    mySnipes: () => [...UserQueryKeys.all, 'my-snipes'] as const,
};

export const getUserDetails = async (): Promise<UserDetails> => {
    const response = await apiClient.get<UserDetails>('/users/me');
    return response.data;
};

export const getSnipeHistory = async (): Promise<AutobuySale[]> => {
    const response = await apiClient.get<AutobuySale[]>('/users/me/snipes');
    return response.data;
};

export const generateRefCode = async (): Promise<UserDetails> => {
    const response = await apiClient.post<UserDetails>('/users/generate-refcode');
    return response.data;
};

export const updateUserSettings = async (dto: UserSettings): Promise<UserDetails> => {
    const response = await apiClient.put<UserDetails>('/users/settings', dto);
    return response.data;
};
