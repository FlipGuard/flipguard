import {
    BiddingBotGetDto,
    BiddingBotInitializeDto,
    biddingBotToMetadata,
    BiddingBotUpdateDto,
    UserDetails,
} from '@flipguard/webapp-api';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { displayErrorToast, displaySuccessToast } from '../../utils/toasts';
import {
    BIDDING_BOTS_QUERY_KEY,
    initialize,
    startBiddingBot,
    stopBiddingBot,
    updateBiddingBot,
} from '../requests/bidding-bots';
import { UserQueryKeys } from '../requests/user';

export const useBiddingBotInitializeMutation = () => {
    const queryClient = useQueryClient();

    return useMutation([BIDDING_BOTS_QUERY_KEY], (dto: BiddingBotInitializeDto) => initialize(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (createdBot: BiddingBotGetDto) => {
            displaySuccessToast(`Bidding bot "${createdBot.name}" has been created.`);
            addBot(queryClient, createdBot);
            updateBiddingBotMetadata(queryClient, createdBot);
        },
    });
};

export const useBiddingBotStartMutation = () => {
    const queryClient = useQueryClient();

    return useMutation([BIDDING_BOTS_QUERY_KEY], (botId: string) => startBiddingBot(botId), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (startedBot: BiddingBotGetDto) => {
            displaySuccessToast(`"${startedBot.name}" has been started.`);
            updateBot(queryClient, startedBot);
            updateBiddingBotMetadata(queryClient, startedBot);
        },
    });
};

export const useBiddingBotStopMutation = () => {
    const queryClient = useQueryClient();

    return useMutation([BIDDING_BOTS_QUERY_KEY], (botId: string) => stopBiddingBot(botId), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (stoppedBot: BiddingBotGetDto) => {
            displaySuccessToast(`"${stoppedBot.name}" has been stopped.`);
            updateBot(queryClient, stoppedBot);
            updateBiddingBotMetadata(queryClient, stoppedBot);
        },
    });
};

type BiddingBotUpdateMutationParams = {
    botId: string;
    dto: BiddingBotUpdateDto;
};

export const useBiddingBotUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        [BIDDING_BOTS_QUERY_KEY],
        ({ botId, dto }: BiddingBotUpdateMutationParams) => updateBiddingBot(botId, dto),
        {
            onError: (error: Error) => {
                displayErrorToast(error.message);
            },
            onSuccess: (updatedBot: BiddingBotGetDto) => {
                displaySuccessToast(`"${updatedBot.name}" has been updated.`);
                updateBot(queryClient, updatedBot);
                updateBiddingBotMetadata(queryClient, updatedBot);
            },
        },
    );
};

const addBot = (queryClient: QueryClient, bot: BiddingBotGetDto) => {
    queryClient.setQueryData<BiddingBotGetDto[]>([BIDDING_BOTS_QUERY_KEY], (bots) => {
        if (bots !== undefined) {
            return [...bots, bot];
        }
    });
};

const updateBot = (queryClient: QueryClient, newBot: BiddingBotGetDto) => {
    queryClient.setQueryData<BiddingBotGetDto[]>([BIDDING_BOTS_QUERY_KEY], (bots) => {
        if (bots !== undefined) {
            return bots.map((b) => (b.id !== newBot.id ? b : newBot));
        }
    });
};

const updateBiddingBotMetadata = (queryClient: QueryClient, bot: BiddingBotGetDto) => {
    queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
        if (userDetails !== undefined) {
            return {
                ...userDetails,
                metadata: {
                    ...userDetails.metadata,
                    biddingBots: {
                        ...userDetails.metadata.biddingBots,
                        [bot.id]: biddingBotToMetadata(bot),
                    },
                },
            };
        }
    });
};
