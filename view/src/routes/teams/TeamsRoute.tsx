import { Grid } from '@mui/material';
import React from 'react';

import { useTeamContext } from '../../contexts/team-context';
import { useAuth } from '../../hooks/use-auth';
import { TeamMasonry } from './components/TeamMasonry';
import { TeamsRouteHeader } from './TeamsRouteHeader';

export const TeamsRoute = () => {
    const { authenticated } = useAuth();
    const { teams, isLoading } = useTeamContext();

    if (!authenticated) {
        return null;
    }

    return (
        <>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <TeamsRouteHeader teams={teams} />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <TeamMasonry teams={teams} loading={isLoading} />
            </Grid>
        </>
    );
};
