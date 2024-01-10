import {
    FlipBotGlobalConfigGetDto,
    FlipBotGlobalConfigUpdateDto,
    FlipBotGlobalFlippingConfigUpdateDto,
    FlipBotGlobalGuildsConfigUpdateDto,
    FlipBotGlobalRaidingConfigUpdateDto,
    FlipBotGlobalRumbleConfigUpdateDto,
    FlipBotGlobalShopConfigUpdateDto,
    PickFlippingContestWinnersRequest,
    PickFlippingContestWinnersResponse,
} from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const FlipBotGlobalSettingsQueryKeys = {
    detail: ['flipbot-global-config'] as const,
};

export const getGlobalSettings = async (): Promise<FlipBotGlobalConfigGetDto> => {
    const response = await apiClient.get<FlipBotGlobalConfigGetDto>('/flipbot/global-config');
    return response.data;
};

export const updateGeneralSettings = async (dto: FlipBotGlobalConfigUpdateDto): Promise<FlipBotGlobalConfigGetDto> => {
    const response = await apiClient.put<FlipBotGlobalConfigGetDto>('/flipbot/global-config', dto);
    return response.data;
};

export const updateFlippingSettings = async (
    dto: FlipBotGlobalFlippingConfigUpdateDto,
): Promise<FlipBotGlobalConfigGetDto> => {
    const response = await apiClient.put<FlipBotGlobalConfigGetDto>('/flipbot/global-config/flipping', dto);
    return response.data;
};

export const updateRaidingSettings = async (
    dto: FlipBotGlobalRaidingConfigUpdateDto,
): Promise<FlipBotGlobalConfigGetDto> => {
    const response = await apiClient.put<FlipBotGlobalConfigGetDto>('/flipbot/global-config/raiding', dto);
    return response.data;
};

export const updateRumbleSettings = async (
    dto: FlipBotGlobalRumbleConfigUpdateDto,
): Promise<FlipBotGlobalConfigGetDto> => {
    const response = await apiClient.put<FlipBotGlobalConfigGetDto>('/flipbot/global-config/rumble', dto);
    return response.data;
};

export const updateShopSettings = async (dto: FlipBotGlobalShopConfigUpdateDto): Promise<FlipBotGlobalConfigGetDto> => {
    const response = await apiClient.put<FlipBotGlobalConfigGetDto>('/flipbot/global-config/shop', dto);
    return response.data;
};

export const setGlobalContestWinners = async (
    request: PickFlippingContestWinnersRequest,
): Promise<PickFlippingContestWinnersResponse> => {
    const url = `/flipbot/global-config/flipping/contest/set-winners`;
    const result = await apiClient.post<PickFlippingContestWinnersResponse>(url, request);
    return result.data;
};

export const updateGuildGlobalSettings = async (
    guildId: string,
    dto: FlipBotGlobalGuildsConfigUpdateDto,
): Promise<FlipBotGlobalConfigGetDto> => {
    const response = await apiClient.put<FlipBotGlobalConfigGetDto>('/flipbot/global-config/guilds/' + guildId, dto);
    return response.data;
};

export const syncGuildGlobalSettings = async (): Promise<FlipBotGlobalConfigGetDto> => {
    const response = await apiClient.post<FlipBotGlobalConfigGetDto>('/flipbot/global-config/guilds/sync');
    return response.data;
};

export const deleteGuildGlobalSettings = async (guildId: string): Promise<FlipBotGlobalConfigGetDto> => {
    const response = await apiClient.delete<FlipBotGlobalConfigGetDto>('/flipbot/global-config/guilds/' + guildId);
    return response.data;
};
