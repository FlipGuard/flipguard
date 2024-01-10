import { FlipBotGuildConfigGetDto, FlipBotModuleRaidingCreateRaidDto } from '@flipguard/webapp-api';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { displayErrorToast } from '../../utils/toasts';
import { FlipBotGuildConfigsQueryKeys } from '../requests/flipbot-guild-configs';
import { createRaid, deleteRaid } from '../requests/flipbot-modules-raiding';

type CreateRaidMutationParams = {
    configId: string;
    dto: FlipBotModuleRaidingCreateRaidDto;
};

export const useCreateRaidMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((args: CreateRaidMutationParams) => createRaid(args.configId, args.dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (updatedGuildConfig: FlipBotGuildConfigGetDto) => {
            replaceGuildConfig(queryClient, updatedGuildConfig);
        },
    });
};

type DeleteRaidMutationParams = {
    configId: string;
    raidId: string;
};

export const useDeleteRaidMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((args: DeleteRaidMutationParams) => deleteRaid(args.configId, args.raidId), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (updatedGuildConfig: FlipBotGuildConfigGetDto) => {
            replaceGuildConfig(queryClient, updatedGuildConfig);
        },
    });
};

const replaceGuildConfig = (queryClient: QueryClient, guildConfig: FlipBotGuildConfigGetDto) => {
    queryClient.setQueryData<FlipBotGuildConfigGetDto[]>(FlipBotGuildConfigsQueryKeys.list(), (guildConfigs) => {
        if (guildConfigs !== undefined) {
            return guildConfigs.map((c) => (c.id === guildConfig.id ? guildConfig : c));
        }
    });
};
