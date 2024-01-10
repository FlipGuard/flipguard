import { GenerateGiftCodeDto, GiftCodeModel, RedeemGiftCodeDto } from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const GIFT_CODES_KEY = 'redeem-codes';

export const redeemGiftCode = async (dto: RedeemGiftCodeDto): Promise<GiftCodeModel> => {
    const result = await apiClient.post<GiftCodeModel>(`/gift-codes/redeem`, dto);
    return result.data;
};

export const generateGiftCode = async (dto: GenerateGiftCodeDto): Promise<GiftCodeModel> => {
    const result = await apiClient.post<GiftCodeModel>(`/gift-codes/generate`, dto);
    return result.data;
};
