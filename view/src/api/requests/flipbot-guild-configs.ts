import {
    FlipBotGuildConfigCreateDto,
    FlipBotGuildConfigGetDto,
    FlipBotGuildConfigMoveToTeamDto,
} from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const FlipBotGuildConfigsQueryKeys = {
    all: ['flipbot-guild-configs'] as const,
    list: () => [...FlipBotGuildConfigsQueryKeys.all, 'list'] as const,
    details: () => [...FlipBotGuildConfigsQueryKeys.all, 'detail'] as const,
    detail: (id: string) => [...FlipBotGuildConfigsQueryKeys.details(), id] as const,
};

export const getFlipBotConfigs = async (): Promise<FlipBotGuildConfigGetDto[]> => {
    const result = await apiClient.get<FlipBotGuildConfigGetDto[]>('/flipbot/guild-configs');
    return result.data;
};

export const createGuildConfig = async (dto: FlipBotGuildConfigCreateDto): Promise<FlipBotGuildConfigGetDto> => {
    const result = await apiClient.post<FlipBotGuildConfigGetDto>('/flipbot/guild-configs', dto);
    return result.data;
};

export const unassignGuild = async (configId: string): Promise<FlipBotGuildConfigGetDto> => {
    const result = await apiClient.post<FlipBotGuildConfigGetDto>(`/flipbot/guild-configs/${configId}/unassign`);
    return result.data;
};

export const deleteFlipBotConfig = async (configId: string) => {
    await apiClient.delete(`/flipbot/guild-configs/${configId}`);
};

export const moveGuildConfigToTeam = async (
    configId: string,
    dto: FlipBotGuildConfigMoveToTeamDto,
): Promise<FlipBotGuildConfigGetDto> => {
    const url = `/flipbot/guild-configs/${configId}/move-to-team`;
    const result = await apiClient.post<FlipBotGuildConfigGetDto>(url, dto);
    return result.data;
};
