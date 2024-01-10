import { TeamCreateDto, TeamModel, TeamUpdateDto } from '@flipguard/webapp-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { displayErrorToast } from '../../utils/toasts';
import { createTeam, deleteTeam, TeamsQueryKeys, updateTeam } from '../requests/teams';

type CreateTeamMutationParams = {
    dto: TeamCreateDto;
};

export const useCreateTeamMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((args: CreateTeamMutationParams) => createTeam(args.dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (addedTeam: TeamModel) => {
            queryClient.setQueryData<TeamModel[]>(TeamsQueryKeys.myTeams(), (prev) => {
                if (prev) {
                    return [...prev, addedTeam];
                }
            });
        },
    });
};

type UpdateTeamMutationParams = {
    teamId: string;
    dto: TeamUpdateDto;
};

export const useUpdateTeamMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((args: UpdateTeamMutationParams) => updateTeam(args.teamId, args.dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (updatedTeam: TeamModel) => {
            queryClient.setQueryData<TeamModel[]>(TeamsQueryKeys.myTeams(), (prev) => {
                if (prev) {
                    return prev.map((t) => (t.id === updatedTeam.id ? updatedTeam : t));
                }
            });
        },
    });
};

type DeleteTeamMutationParams = {
    teamId: string;
};

export const useDeleteTeamMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((args: DeleteTeamMutationParams) => deleteTeam(args.teamId), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (_, { teamId }) => {
            queryClient.setQueryData<TeamModel[]>(TeamsQueryKeys.myTeams(), (prev) => {
                if (prev) {
                    return prev.filter((t) => t.id !== teamId);
                }
            });
        },
    });
};
