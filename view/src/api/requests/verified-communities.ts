import { FlipBotGlobalGuildConfigGetDto } from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const VerifiedCommunitiesQueryKeys = {
    all: ['verified-communities'] as const,
    list: () => [...VerifiedCommunitiesQueryKeys.all, 'list'] as const,
    details: () => [...VerifiedCommunitiesQueryKeys.all, 'detail'] as const,
    detail: (id: string) => [...VerifiedCommunitiesQueryKeys.details(), id] as const,
};

export const getVerifiedCommunities = async (): Promise<Record<string, FlipBotGlobalGuildConfigGetDto>> => {
    const response = await apiClient.get<Record<string, FlipBotGlobalGuildConfigGetDto>>('/verified-communities');
    return response.data;
};
