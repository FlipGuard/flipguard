import { FlippingRoomDto, PickFlippingContestWinnersRequest } from '@flipguard/webapp-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { displayErrorToast, displaySuccessToast } from '../../utils/toasts';
import { CoinFlipQueryKeys } from '../requests/coinflip';
import { FlipBotGuildConfigsQueryKeys } from '../requests/flipbot-guild-configs';
import { setCommunityContestWinners } from '../requests/flipbot-modules-flipping';

type SetCommunityContestWinnersParams = {
    configId: string;
    roomId: string;
    request: PickFlippingContestWinnersRequest;
};

export const useSetCommunityContestWinnersMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ configId, request }: SetCommunityContestWinnersParams) => setCommunityContestWinners(configId, request),
        {
            onError: (error: Error) => {
                displayErrorToast(error.message);
            },
            onSuccess: async (response, { configId, roomId, request }) => {
                displaySuccessToast(`Winners has been set`);
                await queryClient.resetQueries(FlipBotGuildConfigsQueryKeys.detail(configId));
                queryClient.setQueryData<FlippingRoomDto>(CoinFlipQueryKeys.room(roomId), (room) => {
                    if (room && room.contest) {
                        return {
                            ...room,
                            contest: {
                                ...room.contest,
                                winners: {
                                    ...room.contest.winners,
                                    [request.leaderboard]: response.winners,
                                },
                            },
                        };
                    }
                });
            },
        },
    );
};
