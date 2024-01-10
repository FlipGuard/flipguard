import {
    FlipBotGlobalConfigGetDto,
    FlipBotGlobalConfigUpdateDto,
    FlipBotGlobalFlippingConfigUpdateDto,
    FlipBotGlobalGuildsConfigUpdateDto,
    FlipBotGlobalRaidingConfigUpdateDto,
    FlipBotGlobalRumbleConfigUpdateDto,
    FlipBotGlobalShopConfigUpdateDto,
    FlippingContest,
    PickFlippingContestWinnersRequest,
} from '@flipguard/webapp-api';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { displayErrorToast, displaySuccessToast } from '../../utils/toasts';
import { CoinFlipQueryKeys } from '../requests/coinflip';
import {
    deleteGuildGlobalSettings,
    FlipBotGlobalSettingsQueryKeys,
    setGlobalContestWinners,
    syncGuildGlobalSettings,
    updateFlippingSettings,
    updateGeneralSettings,
    updateGuildGlobalSettings,
    updateRaidingSettings,
    updateRumbleSettings,
    updateShopSettings,
} from '../requests/flipbot-global-config';

export const useGlobalGeneralSettingsUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((dto: FlipBotGlobalConfigUpdateDto) => updateGeneralSettings(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (settings) => {
            displaySuccessToast('Global settings has been updated');
            updateSettings(queryClient, settings);
        },
    });
};

export const useGlobalFlippingSettingsUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((dto: FlipBotGlobalFlippingConfigUpdateDto) => updateFlippingSettings(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (settings) => {
            updateSettings(queryClient, settings);
        },
    });
};

export const useGlobalRaidingSettingsUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((dto: FlipBotGlobalRaidingConfigUpdateDto) => updateRaidingSettings(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (settings) => {
            updateSettings(queryClient, settings);
        },
    });
};

export const useGlobalRumbleSettingsUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((dto: FlipBotGlobalRumbleConfigUpdateDto) => updateRumbleSettings(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (settings) => {
            updateSettings(queryClient, settings);
        },
    });
};

export const useGlobalShopSettingsUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((dto: FlipBotGlobalShopConfigUpdateDto) => updateShopSettings(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (settings) => {
            updateSettings(queryClient, settings);
        },
    });
};

type GlobalGuildSettingsUpdateParams = {
    guildId: string;
    dto: FlipBotGlobalGuildsConfigUpdateDto;
};

export const useGlobalGuildSettingsUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(({ guildId, dto }: GlobalGuildSettingsUpdateParams) => updateGuildGlobalSettings(guildId, dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (settings) => {
            displaySuccessToast('Server settings has been updated');
            updateSettings(queryClient, settings);
        },
    });
};

export const useGlobalGuildSettingsSyncMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(syncGuildGlobalSettings, {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (settings) => {
            displaySuccessToast('Servers info has been synced');
            updateSettings(queryClient, settings);
        },
    });
};

export const useGlobalGuildSettingsDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((guildId: string) => deleteGuildGlobalSettings(guildId), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (settings) => {
            displaySuccessToast('Guild settings has been deleted');
            updateSettings(queryClient, settings);
        },
    });
};

const updateSettings = (queryClient: QueryClient, settings: FlipBotGlobalConfigGetDto) => {
    queryClient.setQueryData<FlipBotGlobalConfigGetDto>(FlipBotGlobalSettingsQueryKeys.detail, () => settings);
};

export const useSetGlobalContestWinnersMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((request: PickFlippingContestWinnersRequest) => setGlobalContestWinners(request), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: async (response, request) => {
            displaySuccessToast(`Winners has been set`);
            queryClient.setQueryData<FlippingContest>(CoinFlipQueryKeys.globalEvent, (contest) => {
                if (contest) {
                    return {
                        ...contest,
                        winners: {
                            ...contest.winners,
                            [request.leaderboard]: response.winners,
                        },
                    };
                }
            });
        },
    });
};
