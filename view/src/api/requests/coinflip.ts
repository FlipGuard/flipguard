import { ExecuteFlipRequestDto, FlipExecutedGetDto, FlippingContest, FlippingRoomDto } from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const CoinFlipQueryKeys = {
    rooms: ['flipping-rooms'] as const,
    room: (roomId: string) => [...CoinFlipQueryKeys.rooms, roomId] as const,
    roomWinChance: (roomId: string) => [...CoinFlipQueryKeys.rooms, 'win-chance', roomId] as const,
    globalEvent: ['coinflip-global-event'] as const,
};

export const getFlippingRoom = async (roomId: string): Promise<FlippingRoomDto> => {
    const response = await apiClient.get<FlippingRoomDto>('/coinflip/rooms/' + roomId);
    return response.data;
};

export const executeFlip = async (dto: ExecuteFlipRequestDto): Promise<FlipExecutedGetDto> => {
    const response = await apiClient.post<FlipExecutedGetDto>('/coinflip/flips/execute', dto);
    return response.data;
};

export const getGlobalEventInfo = async (): Promise<FlippingContest> => {
    const response = await apiClient.get<FlippingContest>('/coinflip/global/contest');
    return response.data;
};

export const getRoomWinChance = async (roomId: string): Promise<number> => {
    const response = await apiClient.get<number>(`/coinflip/rooms/${roomId}/odds`);
    return response.data;
};
