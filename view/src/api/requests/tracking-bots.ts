import { BotCreateDto, BotGetDto, BotUpdateDto } from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const BotQueryKeys = {
    all: ['bots'] as const,
    list: () => [...BotQueryKeys.all, 'list'] as const,
    details: () => [...BotQueryKeys.all, 'detail'] as const,
    detail: (id: string) => [...BotQueryKeys.details(), id] as const,
};

export const getBots = async (): Promise<BotGetDto[]> => {
    const result = await apiClient.get<BotGetDto[]>('/tracking-bots');
    result.data.sort((a, b) => a.name.localeCompare(b.name));
    return result.data;
};

export const createBot = async (dto: BotCreateDto): Promise<BotGetDto> => {
    const result = await apiClient.post<BotGetDto>('/tracking-bots', dto);
    return result.data;
};

export const startBot = async (botId: string): Promise<BotGetDto> => {
    const result = await apiClient.post<BotGetDto>(`/tracking-bots/start/${botId}`);
    return result.data;
};

export const stopBot = async (botId: string): Promise<BotGetDto> => {
    const result = await apiClient.post<BotGetDto>(`/tracking-bots/stop/${botId}`);
    return result.data;
};

export const restartBot = async (botId: string): Promise<BotGetDto> => {
    const result = await apiClient.post<BotGetDto>(`/tracking-bots/restart/${botId}`);
    return result.data;
};

export const changeBotType = async (botId: string): Promise<BotGetDto> => {
    const result = await apiClient.post<BotGetDto>(`/tracking-bots/change-type/${botId}`);
    return result.data;
};

export const updateBot = async (botId: string, dto: BotUpdateDto): Promise<BotGetDto> => {
    const result = await apiClient.patch<BotGetDto>(`/tracking-bots/${botId}`, dto);
    return result.data;
};

export const deleteBot = async (botId: string): Promise<void> => {
    await apiClient.delete(`/tracking-bots/${botId}`);
};
