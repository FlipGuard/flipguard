import {
    BiddingBotGetDto,
    BiddingBotInitializeDto,
    BiddingBotUpdateDto,
    BiddingBotWithdrawFundsDto,
    BiddingBotWithdrawFundsResultDto,
    BiddingBotWithdrawNftsDto,
    BiddingBotWithdrawNftsResultDto,
} from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const BIDDING_BOTS_QUERY_KEY = 'bidding-bots';

export const getAllBiddingBots = async (): Promise<BiddingBotGetDto[]> => {
    const result = await apiClient.get<BiddingBotGetDto[]>('/bidding-bots');
    result.data.sort((a, b) => a.name.localeCompare(b.name));
    return result.data;
};

export const initialize = async (dto: BiddingBotInitializeDto): Promise<BiddingBotGetDto> => {
    const result = await apiClient.post<BiddingBotGetDto>('/bidding-bots/initialize', dto);
    return result.data;
};

export const startBiddingBot = async (botId: string): Promise<BiddingBotGetDto> => {
    const result = await apiClient.post<BiddingBotGetDto>('/bidding-bots/start/' + botId);
    return result.data;
};

export const stopBiddingBot = async (botId: string): Promise<BiddingBotGetDto> => {
    const result = await apiClient.post<BiddingBotGetDto>('/bidding-bots/stop/' + botId);
    return result.data;
};

export const updateBiddingBot = async (botId: string, dto: BiddingBotUpdateDto): Promise<BiddingBotGetDto> => {
    const result = await apiClient.patch<BiddingBotGetDto>('/bidding-bots/' + botId, dto);
    return result.data;
};

export const withdrawFundsFromBiddingBot = async (
    botId: string,
    dto: BiddingBotWithdrawFundsDto,
): Promise<BiddingBotWithdrawFundsResultDto> => {
    const url = '/bidding-bots/' + botId + '/withdraw-funds';
    const result = await apiClient.post<BiddingBotWithdrawFundsResultDto>(url, dto);
    return result.data;
};

export const withdrawNftsFromBiddingBot = async (
    botId: string,
    dto: BiddingBotWithdrawNftsDto,
): Promise<BiddingBotWithdrawNftsResultDto> => {
    const url = '/bidding-bots/' + botId + '/withdraw-nfts';
    const result = await apiClient.post<BiddingBotWithdrawNftsResultDto>(url, dto);
    return result.data;
};
