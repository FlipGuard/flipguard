import {
    BotCreateDto,
    BotGetDto,
    botToMetadata,
    BotUpdateDto,
    isValidationError,
    UserDetails,
} from '@flipguard/webapp-api';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { displayErrorToast, displaySuccessToast } from '../../utils/toasts';
import {
    BotQueryKeys,
    changeBotType,
    createBot,
    deleteBot,
    restartBot,
    startBot,
    stopBot,
    updateBot,
} from '../requests/tracking-bots';
import { UserQueryKeys } from '../requests/user';

export const useBotCreateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((newBot: BotCreateDto) => createBot(newBot), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (createdBot: BotGetDto) => {
            displaySuccessToast(`"${createdBot.name}" has been created.`);
            addBot(queryClient, createdBot);
            updateBotMetadata(queryClient, createdBot);
        },
    });
};

type UpdateMutationVariables = {
    botId: string;
    dto: BotUpdateDto;
};

export const useBotUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(({ botId, dto }: UpdateMutationVariables) => updateBot(botId, dto), {
        onError: (error: Error) => {
            if (!isValidationError(error)) {
                displayErrorToast(error.message);
            }
        },
        onSuccess: (data) => {
            const updatedBot = data;
            displaySuccessToast(`"${updatedBot.name}" has been updated.`);
            replaceBot(queryClient, updatedBot);
            updateBotMetadata(queryClient, updatedBot);
        },
    });
};

export const useBotStartMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((botId: string) => startBot(botId), {
        onError: (error: Error) => {
            if (!isValidationError(error)) {
                displayErrorToast(error.message);
            }
        },
        onSuccess: (data) => {
            const updatedBot = data;
            displaySuccessToast(`"${updatedBot.name}" has been started.`);
            replaceBot(queryClient, updatedBot);
            updateBotMetadata(queryClient, updatedBot);
        },
    });
};

export const useBotStopMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((botId: string) => stopBot(botId), {
        onError: (error: Error) => {
            if (!isValidationError(error)) {
                displayErrorToast(error.message);
            }
        },
        onSuccess: (data) => {
            const updatedBot = data;
            displaySuccessToast(`"${updatedBot.name}" has been stopped.`);
            replaceBot(queryClient, updatedBot);
            updateBotMetadata(queryClient, updatedBot);
        },
    });
};

export const useBotRestartMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((botId: string) => restartBot(botId), {
        onError: (error: Error) => {
            if (!isValidationError(error)) {
                displayErrorToast(error.message);
            }
        },
        onSuccess: (data) => {
            const updatedBot = data;
            displaySuccessToast(`"${updatedBot.name}" has been restarted.`);
            replaceBot(queryClient, updatedBot);
            updateBotMetadata(queryClient, updatedBot);
        },
    });
};

const addBot = (queryClient: QueryClient, bot: BotGetDto) => {
    queryClient.setQueryData<BotGetDto[]>(BotQueryKeys.list(), (bots) => {
        if (bots !== undefined) {
            return [...bots, bot];
        }
    });
};

const replaceBot = (queryClient: QueryClient, bot: BotGetDto) => {
    queryClient.setQueryData<BotGetDto[]>(BotQueryKeys.list(), (bots) => {
        if (bots !== undefined) {
            return bots.map((b) => (b.id !== bot.id ? b : bot));
        }
    });
};

export const useBotChangeTypeMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((botId: string) => changeBotType(botId), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (data) => {
            const updatedBot = data;
            displaySuccessToast(`"${updatedBot.name}" config type has been changed.`);
            replaceBot(queryClient, updatedBot);
        },
    });
};

const updateBotMetadata = (queryClient: QueryClient, bot: BotGetDto) => {
    queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
        if (userDetails !== undefined) {
            return {
                ...userDetails,
                metadata: {
                    ...userDetails.metadata,
                    bots: {
                        ...userDetails.metadata.bots,
                        [bot.id]: botToMetadata(bot),
                    },
                },
            };
        }
    });
};

type DeleteMutationVariables = {
    botId: string;
    botName: string;
};

export const useBotDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(({ botId }: DeleteMutationVariables) => deleteBot(botId), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (data, variables: DeleteMutationVariables) => {
            const { botId, botName } = variables;
            displaySuccessToast(`"${botName}" has been deleted.`);

            queryClient.setQueryData<BotGetDto[]>(BotQueryKeys.list(), (bots) => {
                if (bots !== undefined) {
                    return bots.filter((b) => b.id !== botId);
                }
            });

            queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
                if (userDetails !== undefined) {
                    const newBotsMetadata = { ...userDetails.metadata.bots };
                    delete newBotsMetadata[botId];

                    return {
                        ...userDetails,
                        metadata: {
                            ...userDetails.metadata,
                            bots: newBotsMetadata,
                        },
                    };
                }
            });
        },
    });
};
