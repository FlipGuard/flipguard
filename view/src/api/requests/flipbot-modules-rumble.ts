import {
    FlipBotGuildConfigGetDto,
    FlipBotModuleRumbleSettingsUpdateDto,
    WalletNftDto,
    WalletNftsResponse,
} from '@flipguard/webapp-api';

import { apiClient } from '../http-client';
import { FlipBotGuildConfigsQueryKeys } from './flipbot-guild-configs';

export const FlipBotRumbleModuleQueryKeys = {
    all: (id: string) => [...FlipBotGuildConfigsQueryKeys.detail(id), 'rumble'] as const,
    rewardsWalletNfts: (id: string) => [...FlipBotRumbleModuleQueryKeys.all(id), 'rewards-wallet-nfts'] as const,
};

export const updateRumbleModuleSettings = async (
    configId: string,
    dto: FlipBotModuleRumbleSettingsUpdateDto,
): Promise<FlipBotGuildConfigGetDto> => {
    const result = await apiClient.patch<FlipBotGuildConfigGetDto>('/flipbot/modules/rumble/' + configId, dto);
    return result.data;
};

export const getRewardsWalletNfts = async (configId: string): Promise<WalletNftDto[]> => {
    const url = `/flipbot/modules/rumble/${configId}/rewards-wallet/nfts`;
    const result = await apiClient.get<WalletNftsResponse>(url);
    return result.data.nfts;
};
