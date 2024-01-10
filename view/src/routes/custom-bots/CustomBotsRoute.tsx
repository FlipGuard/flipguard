import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { BotQueryKeys, getBots } from '../../api/requests/tracking-bots';
import { useAuth } from '../../hooks/use-auth';
import { isCustomBot } from '../../utils/tracking-bots';
import { CustomBotsRouteHeader } from './CustomBotsRouteHeader';
import { CustomBotsTable } from './table/CustomBotsTable';

export const CustomBotsRoute = () => {
    const { authenticated } = useAuth();

    const { isLoading, data: bots = [] } = useQuery(BotQueryKeys.list(), getBots, {
        enabled: authenticated,
    });

    const showProgress = authenticated && isLoading;
    const customBots = bots.filter(isCustomBot);

    return (
        <>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <CustomBotsRouteHeader />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <CustomBotsTable bots={customBots} loading={showProgress} />
            </Grid>
        </>
    );
};
