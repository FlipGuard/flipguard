import { Payout } from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const PAYOUTS_KEY = 'payouts';

export const getPayouts = async (): Promise<Payout[]> => {
    const result = await apiClient.get<Payout[]>('/payouts');
    const payouts = result.data;
    payouts.sort((a, b) => b.createdAt - a.createdAt);
    return payouts;
};
