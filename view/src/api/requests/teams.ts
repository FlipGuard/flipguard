import { TeamCreateDto, TeamModel, TeamUpdateDto } from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const TeamsQueryKeys = {
    all: ['teams'] as const,
    myTeams: () => [...TeamsQueryKeys.all, 'my'] as const,
};

export const getUserTeams = async () => {
    const response = await apiClient.get<TeamModel[]>('/teams');
    return response.data;
};

export const createTeam = async (dto: TeamCreateDto) => {
    const response = await apiClient.post<TeamModel>('/teams', dto);
    return response.data;
};

export const updateTeam = async (teamId: string, dto: TeamUpdateDto) => {
    const response = await apiClient.put<TeamModel>(`/teams/${teamId}`, dto);
    return response.data;
};

export const deleteTeam = async (teamId: string) => {
    await apiClient.delete<TeamModel>(`/teams/${teamId}`);
};
