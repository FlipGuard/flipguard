import { FlipBotGuildConfigGetDto, FlipBotModuleTokenGatingSettingsUpdateDto } from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const updateTokenGatingModuleSettings = async (
    configId: string,
    dto: FlipBotModuleTokenGatingSettingsUpdateDto,
): Promise<FlipBotGuildConfigGetDto> => {
    const result = await apiClient.patch<FlipBotGuildConfigGetDto>('/flipbot/modules/token-gating/' + configId, dto);
    return result.data;
};
