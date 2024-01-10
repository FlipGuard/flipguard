import { TeamModel } from '@flipguard/webapp-api';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { getUserTeams, TeamsQueryKeys } from '../api/requests/teams';
import { TEAM_ID_TOKEN_KEY } from '../config/constants/local-storage';
import { useAuth } from '../hooks/use-auth';

type TeamContextState = {
    scopedTeam?: TeamModel;
    setScopedTeam: (teamId: string) => void;
    teams: TeamModel[];
    setTeams: (teams: TeamModel[]) => void;
    isLoading: boolean;
};

const TeamContext = createContext<TeamContextState>({
    setScopedTeam: () => {},
    teams: [],
    setTeams: () => {},
    isLoading: true,
});

export const TeamContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { authenticated } = useAuth();

    const [scopedTeam, setScopedTeam] = useState<TeamModel | undefined>();
    const [teams, setTeams] = useState<TeamModel[]>([]);

    const {
        data: fetchedTeams = [],
        isSuccess,
        isLoading,
    } = useQuery(TeamsQueryKeys.myTeams(), getUserTeams, {
        enabled: authenticated,
    });

    const onTeamChange = (teamId: string) => {
        const team = fetchedTeams.find((t) => t.id === teamId);
        if (team) {
            localStorage.setItem(TEAM_ID_TOKEN_KEY, teamId);
            setScopedTeam(team);
        } else {
            localStorage.removeItem(TEAM_ID_TOKEN_KEY);
            setScopedTeam(undefined);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setTeams(fetchedTeams);
            const teamIdToSet = localStorage.getItem(TEAM_ID_TOKEN_KEY) ?? '';
            teamIdToSet && onTeamChange(teamIdToSet);
        }
    }, [JSON.stringify(fetchedTeams), isSuccess]);

    return (
        <TeamContext.Provider value={{ scopedTeam, setScopedTeam: onTeamChange, teams, setTeams, isLoading }}>
            {children}
        </TeamContext.Provider>
    );
};

export const useTeamContext = (): TeamContextState => {
    const context = useContext(TeamContext);
    if (context === undefined) {
        throw new Error('useTeamContext() must be used within a FlipBotContextProvider');
    }
    return context;
};
