import {
    FlippingGlobalLeaderboard,
    FlippingGlobalLeaderboardType,
    FlippingGuildLeaderboard,
    FlippingGuildLeaderboardType,
} from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const CoinFlipLeaderboardsQueryKeys = {
    all: ['coinflip-leaderboards'] as const,
    room: (roomId: string, token: string) => [...CoinFlipLeaderboardsQueryKeys.all, 'room', roomId, token] as const,
    roomEvent: (roomId: string, type: FlippingGuildLeaderboardType) =>
        [...CoinFlipLeaderboardsQueryKeys.all, 'room-event', roomId, type] as const,
    global: (type: FlippingGlobalLeaderboardType, token: string) =>
        [...CoinFlipLeaderboardsQueryKeys.all, 'global', type, token] as const,
    globalEvent: (type: FlippingGuildLeaderboardType) =>
        [...CoinFlipLeaderboardsQueryKeys.all, 'global-event', type] as const,
};

export const getRoomLeaderboard = async (roomId: string, token: string): Promise<FlippingGuildLeaderboard> => {
    const url = `/coinflip/rooms/${roomId}/leaderboard/${token}`;
    const response = await apiClient.get<FlippingGuildLeaderboard>(url);
    return response.data;
};

export const getGlobalLeaderboard = async (
    type: FlippingGlobalLeaderboardType,
    token: string,
): Promise<FlippingGlobalLeaderboard> => {
    const url = `/coinflip/global/leaderboard/${type}/${token}`;
    const response = await apiClient.get<FlippingGlobalLeaderboard>(url);
    return response.data;
};

export const getCommunityEventLeaderboard = async (
    roomId: string,
    type: FlippingGuildLeaderboardType,
): Promise<FlippingGuildLeaderboard> => {
    const url = `/coinflip/rooms/${roomId}/contest/leaderboard/${type}`;
    const response = await apiClient.get<FlippingGuildLeaderboard>(url);
    return response.data;
};

export const getGlobalEventLeaderboard = async (
    type: FlippingGuildLeaderboardType,
): Promise<FlippingGuildLeaderboard> => {
    const url = `/coinflip/global/contest/leaderboard/${type}`;
    const response = await apiClient.get<FlippingGuildLeaderboard>(url);
    return response.data;
};
