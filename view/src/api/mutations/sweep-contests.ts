import {
    isValidationError,
    SweepContestCreateDto,
    SweepContestGetDto,
    SweepContestLeaderboardDto,
    SweepContestMoveToTeamDto,
    SweepContestSetSaleStatusDto,
    SweepContestSetWalletStatusDto,
    sweepContestToMetadata,
    SweepContestUpdateDto,
    UserDetails,
} from '@flipguard/webapp-api';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { displayErrorToast, displaySuccessToast } from '../../utils/toasts';
import {
    createSweepContest,
    deleteSweepContest,
    moveSweepContestToTeam,
    setSweepContestSaleStatus,
    setSweepContestWalletStatus,
    startSweepContest,
    stopSweepContest,
    SweepContestQueryKeys,
    updateSweepContest,
} from '../requests/sweep-contests';
import { UserQueryKeys } from '../requests/user';

export const useSweepContestCreateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((newSweepContest: SweepContestCreateDto) => createSweepContest(newSweepContest), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (createdSweepContest: SweepContestGetDto) => {
            displaySuccessToast(`"${createdSweepContest.name}" has been created.`);
            addSweepContest(queryClient, createdSweepContest);
            updateSweepContestMetadata(queryClient, createdSweepContest);
        },
    });
};

type UpdateMutationVariables = {
    sweepContestId: string;
    dto: SweepContestUpdateDto;
};

export const useSweepContestUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(({ sweepContestId, dto }: UpdateMutationVariables) => updateSweepContest(sweepContestId, dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (updatedSweepContest: SweepContestGetDto) => {
            displaySuccessToast(`"${updatedSweepContest.name}" has been updated.`);
            replaceSweepContest(queryClient, updatedSweepContest);
            updateSweepContestMetadata(queryClient, updatedSweepContest);
        },
    });
};

type SweepContestMoveToTeamParams = {
    sweepContestId: string;
    dto: SweepContestMoveToTeamDto;
};

export const useSweepContestMoveToTeamMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((args: SweepContestMoveToTeamParams) => moveSweepContestToTeam(args.sweepContestId, args.dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (updatedSweepContest: SweepContestGetDto) => {
            replaceSweepContest(queryClient, updatedSweepContest);
            updateSweepContestMetadata(queryClient, updatedSweepContest);
        },
    });
};

export const useSweepContestStartMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((sweepContestId: string) => startSweepContest(sweepContestId), {
        onError: (error: Error) => {
            if (!isValidationError(error)) {
                displayErrorToast(error.message);
            }
        },
        onSuccess: (data) => {
            const updateSweepContest = data;
            displaySuccessToast(`"${updateSweepContest.name}" has been started.`);
            replaceSweepContest(queryClient, updateSweepContest);
            updateSweepContestMetadata(queryClient, updateSweepContest);
        },
    });
};

export const useSweepContestStopMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((sweepContestId: string) => stopSweepContest(sweepContestId), {
        onError: (error: Error) => {
            if (!isValidationError(error)) {
                displayErrorToast(error.message);
            }
        },
        onSuccess: (data) => {
            const updateSweepContest = data;
            displaySuccessToast(`"${updateSweepContest.name}" has been stopped.`);
            replaceSweepContest(queryClient, updateSweepContest);
            updateSweepContestMetadata(queryClient, updateSweepContest);
        },
    });
};

type DeleteMutationVariables = {
    sweepContestId: string;
    sweepContestName: string;
};

export const useSweepContestDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(({ sweepContestId }: DeleteMutationVariables) => deleteSweepContest(sweepContestId), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (data, variables: DeleteMutationVariables) => {
            const { sweepContestId, sweepContestName } = variables;
            displaySuccessToast(`"${sweepContestName}" has been deleted.`);

            queryClient.setQueryData<SweepContestGetDto[]>(SweepContestQueryKeys.list(), (sweepContests) => {
                if (sweepContests !== undefined) {
                    return sweepContests.filter((b) => b.id !== sweepContestId);
                }
            });

            queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
                if (userDetails !== undefined) {
                    const newSweepContestsMetadata = { ...userDetails.metadata.sweepContests };
                    delete newSweepContestsMetadata[sweepContestId];

                    return {
                        ...userDetails,
                        metadata: {
                            ...userDetails.metadata,
                            sweepContests: newSweepContestsMetadata,
                        },
                    };
                }
            });
        },
    });
};

type SetWalletStatusVariables = {
    sweepContestId: string;
    dto: SweepContestSetWalletStatusDto;
};

export const useSweepContestSetWalletStatusMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ sweepContestId, dto }: SetWalletStatusVariables) => setSweepContestWalletStatus(sweepContestId, dto),
        {
            onError: (error: Error) => {
                displayErrorToast(error.message);
            },
            onSuccess: (updatedSweepContest: SweepContestLeaderboardDto) => {
                replaceSweepContestLeaderboard(queryClient, updatedSweepContest);
            },
        },
    );
};

type SetSaleStatusVariables = {
    sweepContestId: string;
    dto: SweepContestSetSaleStatusDto;
};

export const useSweepContestSetSaleStatusMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ sweepContestId, dto }: SetSaleStatusVariables) => setSweepContestSaleStatus(sweepContestId, dto),
        {
            onError: (error: Error) => {
                displayErrorToast(error.message);
            },
            onSuccess: (updatedSweepContest: SweepContestLeaderboardDto) => {
                replaceSweepContestLeaderboard(queryClient, updatedSweepContest);
            },
        },
    );
};

const addSweepContest = (queryClient: QueryClient, sweepContest: SweepContestGetDto) => {
    queryClient.setQueryData<SweepContestGetDto[]>(SweepContestQueryKeys.list(), (sweepContests) => {
        if (sweepContests !== undefined) {
            return [...sweepContests, sweepContest];
        }
    });
};

const replaceSweepContest = (queryClient: QueryClient, sweepContest: SweepContestGetDto) => {
    queryClient.setQueryData<SweepContestGetDto[]>(SweepContestQueryKeys.list(), (sweepContests) => {
        if (sweepContests !== undefined) {
            return sweepContests.map((b) => (b.id !== sweepContest.id ? b : sweepContest));
        }
    });
};

const replaceSweepContestLeaderboard = (queryClient: QueryClient, sweepContest: SweepContestLeaderboardDto) => {
    queryClient.setQueryData<SweepContestLeaderboardDto>(
        SweepContestQueryKeys.leaderboard(sweepContest.id),
        sweepContest,
    );
};

const updateSweepContestMetadata = (queryClient: QueryClient, sweepContest: SweepContestGetDto) => {
    queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
        if (userDetails !== undefined) {
            return {
                ...userDetails,
                metadata: {
                    ...userDetails.metadata,
                    sweepContests: {
                        ...userDetails.metadata.sweepContests,
                        [sweepContest.id]: sweepContestToMetadata(sweepContest),
                    },
                },
            };
        }
    });
};
