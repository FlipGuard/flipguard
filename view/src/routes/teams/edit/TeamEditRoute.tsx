import { Grid } from '@mui/material';
import React from 'react';
import { Redirect } from 'wouter';

import { RoutePath } from '../../../config/constants/navigation';
import { useTeamContext } from '../../../contexts/team-context';
import { useAuth } from '../../../hooks/use-auth';
import { TeamEdit } from './TeamEdit';

type Props = {
    teamId: string;
};

export const TeamEditRoute = ({ teamId }: Props) => {
    const { user, authenticated } = useAuth();
    const { teams, isLoading } = useTeamContext();

    if (!authenticated || isLoading) {
        return null;
    }

    const team = teams.find((t) => t.id === teamId);
    if (!team || team.owner !== user.id) {
        return <Redirect to={RoutePath.Teams} />;
    }

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <TeamEdit team={team} />
        </Grid>
    );
};
