import {
    SweepContestCreateDto,
    SweepContestGetDto,
    SweepContestLeaderboardDto,
    SweepContestMoveToTeamDto,
    SweepContestSetSaleStatusDto,
    SweepContestSetWalletStatusDto,
    SweepContestUpdateDto,
} from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const SweepContestQueryKeys = {
    all: ['sweep-contests'] as const,
    list: () => [...SweepContestQueryKeys.all, 'list'] as const,
    details: () => [...SweepContestQueryKeys.all, 'detail'] as const,
    detail: (id: string) => [...SweepContestQueryKeys.details(), id] as const,
    leaderboards: () => [...SweepContestQueryKeys.all, 'leaderboards'] as const,
    leaderboard: (id: string) => [...SweepContestQueryKeys.leaderboards(), id] as const,
};

export const getSweepContestWithLeaderboard = async (sweepContestId: string): Promise<SweepContestLeaderboardDto> => {
    const result = await apiClient.get<SweepContestLeaderboardDto>('/sweep-contests/' + sweepContestId);
    return result.data;
};

export const getSweepContests = async (): Promise<SweepContestGetDto[]> => {
    const result = await apiClient.get<SweepContestGetDto[]>('/sweep-contests');
    result.data.sort((a, b) => a.startTime - b.startTime);
    return result.data;
};

export const createSweepContest = async (dto: SweepContestCreateDto): Promise<SweepContestGetDto> => {
    const result = await apiClient.post<SweepContestGetDto>('/sweep-contests', dto);
    return result.data;
};

export const updateSweepContest = async (
    sweepContestId: string,
    dto: SweepContestUpdateDto,
): Promise<SweepContestGetDto> => {
    const result = await apiClient.put<SweepContestGetDto>(`/sweep-contests/${sweepContestId}`, dto);
    return result.data;
};

export const moveSweepContestToTeam = async (
    sweepContestId: string,
    dto: SweepContestMoveToTeamDto,
): Promise<SweepContestGetDto> => {
    const result = await apiClient.post<SweepContestGetDto>(`/sweep-contests/${sweepContestId}/move-to-team`, dto);
    return result.data;
};

export const startSweepContest = async (sweepContestId: string): Promise<SweepContestGetDto> => {
    const result = await apiClient.post<SweepContestGetDto>(`/sweep-contests/start/${sweepContestId}`);
    return result.data;
};

export const stopSweepContest = async (sweepContestId: string): Promise<SweepContestGetDto> => {
    const result = await apiClient.post<SweepContestGetDto>(`/sweep-contests/stop/${sweepContestId}`);
    return result.data;
};

export const deleteSweepContest = async (sweepContestId: string): Promise<void> => {
    await apiClient.delete(`/sweep-contests/${sweepContestId}`);
};

export const setSweepContestWalletStatus = async (
    sweepContestId: string,
    dto: SweepContestSetWalletStatusDto,
): Promise<SweepContestLeaderboardDto> => {
    const url = `/sweep-contests/${sweepContestId}/wallets`;
    const result = await apiClient.put<SweepContestLeaderboardDto>(url, dto);
    return result.data;
};

export const setSweepContestSaleStatus = async (
    sweepContestId: string,
    dto: SweepContestSetSaleStatusDto,
): Promise<SweepContestLeaderboardDto> => {
    const url = `/sweep-contests/${sweepContestId}/sales`;
    const result = await apiClient.put<SweepContestLeaderboardDto>(url, dto);
    return result.data;
};
