import { FlipBotWithdrawRequestDto, FlipBotWithdrawResponse } from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const withdrawFundsFromFlipWallet = async (dto: FlipBotWithdrawRequestDto): Promise<FlipBotWithdrawResponse> => {
    const response = await apiClient.post<FlipBotWithdrawResponse>('/flipbot/flipwallet/withdraw', dto);
    return response.data;
};
