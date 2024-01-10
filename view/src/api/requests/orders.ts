import { ClaimTrialDto, OrderCancelDto, OrderCreateDto, OrderGetDto, OrderVerifyDto } from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const ORDERS_KEY = 'orders';

export const getOrders = async (): Promise<OrderGetDto[]> => {
    const result = await apiClient.get<OrderGetDto[]>('/orders');
    result.data.sort((a, b) => b.createdAt - a.createdAt);
    return result.data;
};

export const createOrder = async (dto: OrderCreateDto): Promise<OrderGetDto> => {
    const result = await apiClient.post<OrderGetDto>('/orders', dto);
    return result.data;
};

export const verifyOrder = async (dto: OrderVerifyDto): Promise<OrderGetDto> => {
    const result = await apiClient.post<OrderGetDto>(`/orders/verify`, dto);
    return result.data;
};

export const cancelOrder = async (dto: OrderCancelDto): Promise<OrderGetDto> => {
    const result = await apiClient.post(`/orders/cancel`, dto);
    return result.data;
};

export const claimTrial = async (dto: ClaimTrialDto): Promise<OrderGetDto> => {
    const result = await apiClient.post(`/orders/claim-trial`, dto);
    return result.data;
};
