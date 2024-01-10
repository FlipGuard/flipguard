import { FlipProfileDisplayInfo, FlipProfileGetDto, PublicFlipProfileGetDto } from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const FlipProfileQueryKeys = {
    all: ['flip-profiles'] as const,
    me: () => [...FlipProfileQueryKeys.all, 'me'] as const,
    user: (userId: string) => [...FlipProfileQueryKeys.all, 'users', userId] as const,
    avatar: (userId: string) => [...FlipProfileQueryKeys.all, 'avatars', userId] as const,
};

export const getMyFlipProfile = async (): Promise<FlipProfileGetDto> => {
    const response = await apiClient.get<FlipProfileGetDto>('/flip-profiles/me');
    return response.data;
};

export const getFlipProfileOf = async (userId: string): Promise<PublicFlipProfileGetDto> => {
    const response = await apiClient.get<PublicFlipProfileGetDto>('/flip-profiles/' + userId);
    return response.data;
};

export const getFlipProfileAvatarOf = async (userId: string): Promise<FlipProfileDisplayInfo> => {
    const response = await apiClient.get<FlipProfileDisplayInfo>('/flip-profiles/' + userId + '/avatar');
    return response.data;
};
