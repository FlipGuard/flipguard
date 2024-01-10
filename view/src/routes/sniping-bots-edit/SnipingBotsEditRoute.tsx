import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Redirect } from 'wouter';

import { BotQueryKeys, getBots } from '../../api/requests/tracking-bots';
import { RoutePath } from '../../config/constants/navigation';
import { useAuth } from '../../hooks/use-auth';
import { isSnipingBot } from '../../utils/tracking-bots';
import { SnipingBotsEdit } from './SnipingBotsEdit';

type Props = {
    botId: string;
};

export const SnipingBotsEditRoute = ({ botId }: Props) => {
    const { authenticated } = useAuth();

    const { isLoading: isLoading, data: bots } = useQuery(BotQueryKeys.list(), getBots, {
        enabled: authenticated,
    });

    if (isLoading || bots === undefined) {
        return null;
    }

    const bot = bots.find((b) => b.id === botId);
    if (!bot || !isSnipingBot(bot)) {
        return <Redirect to={RoutePath.Dashboard} />;
    }

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <SnipingBotsEdit bot={bot} />
        </Grid>
    );
};
