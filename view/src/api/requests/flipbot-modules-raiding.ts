import {
    FlipBotGuildConfigGetDto,
    FlipBotModuleRaidingCreateRaidDto,
    FlipBotModuleRaidingSettingsUpdateDto,
} from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const updateRaidingModuleSettings = async (
    configId: string,
    dto: FlipBotModuleRaidingSettingsUpdateDto,
): Promise<FlipBotGuildConfigGetDto> => {
    const result = await apiClient.patch<FlipBotGuildConfigGetDto>('/flipbot/modules/raiding/' + configId, dto);
    return result.data;
};

export const createRaid = async (
    configId: string,
    dto: FlipBotModuleRaidingCreateRaidDto,
): Promise<FlipBotGuildConfigGetDto> => {
    const url = `/flipbot/modules/raiding/${configId}/raids`;
    const result = await apiClient.post<FlipBotGuildConfigGetDto>(url, dto);
    return result.data;
};

export const deleteRaid = async (configId: string, raidId: string): Promise<FlipBotGuildConfigGetDto> => {
    const url = `/flipbot/modules/raiding/${configId}/raids/${raidId}`;
    const result = await apiClient.delete(url);
    return result.data;
};
