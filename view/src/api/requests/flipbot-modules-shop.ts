import { FlipBotGuildConfigGetDto, FlipBotModuleShopSettingsUpdateDto } from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const updateShopModuleSettings = async (
    configId: string,
    dto: FlipBotModuleShopSettingsUpdateDto,
): Promise<FlipBotGuildConfigGetDto> => {
    const result = await apiClient.patch<FlipBotGuildConfigGetDto>('/flipbot/modules/shop/' + configId, dto);
    return result.data;
};
