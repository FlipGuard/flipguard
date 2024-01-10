import { FlipBotGuildConfigGetDto, TeamModel } from '@flipguard/webapp-api';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { FlipBotGuildConfigsQueryKeys, getFlipBotConfigs } from '../api/requests/flipbot-guild-configs';
import { FLIPBOT_CONFIG_ID_TOKEN_KEY } from '../config/constants/local-storage';
import { useAuth } from '../hooks/use-auth';
import { useTeamContext } from './team-context';

type FlipBotContextState = {
    scopedConfig?: FlipBotGuildConfigGetDto;
    setScopedConfig: (configId: string) => void;
    configs: FlipBotGuildConfigGetDto[];
    setConfigs: (configs: FlipBotGuildConfigGetDto[]) => void;
    isLoading: boolean;
};

const FlipBotContext = createContext<FlipBotContextState>({
    setScopedConfig: () => {},
    configs: [],
    setConfigs: () => {},
    isLoading: true,
});

export const FlipBotContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { user, authenticated } = useAuth();
    const { scopedTeam } = useTeamContext();

    const [scopedConfig, setScopedConfig] = useState<FlipBotGuildConfigGetDto | undefined>();
    const [configs, setConfigs] = useState<FlipBotGuildConfigGetDto[]>([]);

    const {
        data: fetchedConfigs = [],
        isSuccess,
        isLoading,
    } = useQuery(FlipBotGuildConfigsQueryKeys.list(), getFlipBotConfigs, {
        enabled: authenticated,
    });

    const getConfigsFromTeam = (team: TeamModel) => {
        return fetchedConfigs.filter((c) => c.teamId === team.id);
    };

    const getUserConfigs = () => {
        return fetchedConfigs.filter((c) => c.userId === user.id);
    };

    const onConfigChange = (configId: string) => {
        const visibleConfigs = scopedTeam ? getConfigsFromTeam(scopedTeam) : getUserConfigs();
        const config = visibleConfigs.find((c) => c.id === configId);
        if (config) {
            localStorage.setItem(FLIPBOT_CONFIG_ID_TOKEN_KEY, configId);
            setScopedConfig(config);
        } else {
            !scopedTeam && localStorage.removeItem(FLIPBOT_CONFIG_ID_TOKEN_KEY);
            setScopedConfig(undefined);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setConfigs(scopedTeam ? getConfigsFromTeam(scopedTeam) : getUserConfigs());
            const configIdToSet = localStorage.getItem(FLIPBOT_CONFIG_ID_TOKEN_KEY) ?? '';
            configIdToSet && onConfigChange(configIdToSet);
        }
    }, [JSON.stringify(fetchedConfigs), isSuccess, scopedTeam]);

    return (
        <FlipBotContext.Provider
            value={{ scopedConfig, setScopedConfig: onConfigChange, configs, setConfigs, isLoading }}
        >
            {children}
        </FlipBotContext.Provider>
    );
};

export const useFlipBotContext = (): FlipBotContextState => {
    const context = useContext(FlipBotContext);
    if (context === undefined) {
        throw new Error('useFlipBotContext() must be used within a FlipBotContextProvider');
    }
    return context;
};
