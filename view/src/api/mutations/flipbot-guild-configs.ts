import {
    FlipBotGuildConfigCreateDto,
    FlipBotGuildConfigGetDto,
    FlipBotGuildConfigMoveToTeamDto,
    flipBotGuildConfigToMetadata,
    FlipBotModuleFlippingSettingsUpdateDto,
    FlipBotModuleRaidingSettingsUpdateDto,
    FlipBotModuleRumbleSettingsUpdateDto,
    FlipBotModuleShopSettingsUpdateDto,
    FlipBotModuleTokenGatingSettingsUpdateDto,
    UserDetails,
} from '@flipguard/webapp-api';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { displayErrorToast, displaySuccessToast } from '../../utils/toasts';
import {
    createGuildConfig,
    deleteFlipBotConfig,
    FlipBotGuildConfigsQueryKeys,
    moveGuildConfigToTeam,
    unassignGuild,
} from '../requests/flipbot-guild-configs';
import { updateFlippingModuleSettings } from '../requests/flipbot-modules-flipping';
import { updateRaidingModuleSettings } from '../requests/flipbot-modules-raiding';
import { updateRumbleModuleSettings } from '../requests/flipbot-modules-rumble';
import { updateShopModuleSettings } from '../requests/flipbot-modules-shop';
import { updateTokenGatingModuleSettings } from '../requests/flipbot-modules-token-gating';
import { UserQueryKeys } from '../requests/user';

export const useGuildConfigCreateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((dto: FlipBotGuildConfigCreateDto) => createGuildConfig(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (createGuildConfig: FlipBotGuildConfigGetDto) => {
            displaySuccessToast(`"${createGuildConfig.name}" has been created.`);
            addGuildConfig(queryClient, createGuildConfig);
            updateGuildConfigMetadata(queryClient, createGuildConfig);
        },
    });
};

export const useGuildConfigUnassignGuildMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((configId: string) => unassignGuild(configId), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (updatedGuildConfig: FlipBotGuildConfigGetDto) => {
            displaySuccessToast(`Config has been disconnected from the server`);
            replaceGuildConfig(queryClient, updatedGuildConfig);
            updateGuildConfigMetadata(queryClient, updatedGuildConfig);
        },
    });
};

type GuildConfigMoveToTeamParams = {
    configId: string;
    dto: FlipBotGuildConfigMoveToTeamDto;
};

export const useGuildConfigMoveToTeamMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((args: GuildConfigMoveToTeamParams) => moveGuildConfigToTeam(args.configId, args.dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (updatedGuildConfig: FlipBotGuildConfigGetDto) => {
            replaceGuildConfig(queryClient, updatedGuildConfig);
            updateGuildConfigMetadata(queryClient, updatedGuildConfig);
        },
    });
};

type GuildConfigDeleteParams = {
    configId: string;
};

export const useGuildConfigDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((args: GuildConfigDeleteParams) => deleteFlipBotConfig(args.configId), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (_, { configId }) => {
            queryClient.setQueryData<FlipBotGuildConfigGetDto[]>(
                FlipBotGuildConfigsQueryKeys.list(),
                (guildConfigs) => {
                    if (guildConfigs !== undefined) {
                        return guildConfigs.filter((c) => c.id !== configId);
                    }
                },
            );
            queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
                if (userDetails !== undefined) {
                    const newConfigs = { ...userDetails.metadata.flipBotConfigs };
                    delete newConfigs[configId];
                    return {
                        ...userDetails,
                        metadata: {
                            ...userDetails.metadata,
                            flipBotConfigs: newConfigs,
                        },
                    };
                }
            });
        },
    });
};

type FlippingModuleSettingsUpdateMutationParams = {
    configId: string;
    dto: FlipBotModuleFlippingSettingsUpdateDto;
};

export const useFlippingModuleSettingsUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ configId, dto }: FlippingModuleSettingsUpdateMutationParams) => updateFlippingModuleSettings(configId, dto),
        {
            onError: (error: Error) => {
                displayErrorToast(error.message);
            },
            onSuccess: (updatedGuildConfig: FlipBotGuildConfigGetDto) => {
                replaceGuildConfig(queryClient, updatedGuildConfig);
                updateGuildConfigMetadata(queryClient, updatedGuildConfig);
            },
        },
    );
};

type RaidingModuleSettingsUpdateMutationParams = {
    configId: string;
    dto: FlipBotModuleRaidingSettingsUpdateDto;
};

export const useRaidingModuleSettingsUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        (args: RaidingModuleSettingsUpdateMutationParams) => updateRaidingModuleSettings(args.configId, args.dto),
        {
            onError: (error: Error) => {
                displayErrorToast(error.message);
            },
            onSuccess: (updatedGuildConfig: FlipBotGuildConfigGetDto) => {
                replaceGuildConfig(queryClient, updatedGuildConfig);
                updateGuildConfigMetadata(queryClient, updatedGuildConfig);
            },
        },
    );
};

type RumbleModuleSettingsUpdateMutationParams = {
    configId: string;
    dto: FlipBotModuleRumbleSettingsUpdateDto;
};

export const useRumbleModuleSettingsUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ configId, dto }: RumbleModuleSettingsUpdateMutationParams) => updateRumbleModuleSettings(configId, dto),
        {
            onError: (error: Error) => {
                displayErrorToast(error.message);
            },
            onSuccess: (updatedGuildConfig: FlipBotGuildConfigGetDto) => {
                replaceGuildConfig(queryClient, updatedGuildConfig);
                updateGuildConfigMetadata(queryClient, updatedGuildConfig);
            },
        },
    );
};

type ShopModuleSettingsUpdateMutationParams = {
    configId: string;
    dto: FlipBotModuleShopSettingsUpdateDto;
};

export const useShopModuleSettingsUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ configId, dto }: ShopModuleSettingsUpdateMutationParams) => updateShopModuleSettings(configId, dto),
        {
            onError: (error: Error) => {
                displayErrorToast(error.message);
            },
            onSuccess: (updatedGuildConfig: FlipBotGuildConfigGetDto) => {
                replaceGuildConfig(queryClient, updatedGuildConfig);
                updateGuildConfigMetadata(queryClient, updatedGuildConfig);
            },
        },
    );
};

type TokenGatingModuleSettingsUpdateMutationParams = {
    configId: string;
    dto: FlipBotModuleTokenGatingSettingsUpdateDto;
};

export const useTokenGatingModuleSettingsUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ configId, dto }: TokenGatingModuleSettingsUpdateMutationParams) =>
            updateTokenGatingModuleSettings(configId, dto),
        {
            onError: (error: Error) => {
                displayErrorToast(error.message);
            },
            onSuccess: (updatedGuildConfig: FlipBotGuildConfigGetDto) => {
                replaceGuildConfig(queryClient, updatedGuildConfig);
                updateGuildConfigMetadata(queryClient, updatedGuildConfig);
            },
        },
    );
};

const addGuildConfig = (queryClient: QueryClient, guildConfig: FlipBotGuildConfigGetDto) => {
    queryClient.setQueryData<FlipBotGuildConfigGetDto[]>(FlipBotGuildConfigsQueryKeys.list(), (guildConfigs) => {
        if (guildConfigs !== undefined) {
            return [...guildConfigs, guildConfig];
        }
    });
};

const replaceGuildConfig = (queryClient: QueryClient, guildConfig: FlipBotGuildConfigGetDto) => {
    queryClient.setQueryData<FlipBotGuildConfigGetDto[]>(FlipBotGuildConfigsQueryKeys.list(), (guildConfigs) => {
        if (guildConfigs !== undefined) {
            return guildConfigs.map((c) => (c.id === guildConfig.id ? guildConfig : c));
        }
    });
};

const updateGuildConfigMetadata = (queryClient: QueryClient, guildConfig: FlipBotGuildConfigGetDto) => {
    queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
        if (userDetails !== undefined) {
            return {
                ...userDetails,
                metadata: {
                    ...userDetails.metadata,
                    flipBotConfigs: {
                        ...userDetails.metadata.flipBotConfigs,
                        [guildConfig.id]: flipBotGuildConfigToMetadata(guildConfig),
                    },
                },
            };
        }
    });
};
