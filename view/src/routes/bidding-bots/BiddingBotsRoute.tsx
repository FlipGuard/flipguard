import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { BIDDING_BOTS_QUERY_KEY, getAllBiddingBots } from '../../api/requests/bidding-bots';
import { useAuth } from '../../hooks/use-auth';
import { BiddingBotsRouteHeader } from './BiddingBotsRouteHeader';
import { BiddingBotsTable } from './table/BiddingBotsTable';

export const BiddingBotsRoute = () => {
    const { authenticated } = useAuth();

    const { isLoading, data: bots } = useQuery([BIDDING_BOTS_QUERY_KEY], getAllBiddingBots, {
        enabled: authenticated,
    });

    const showProgress = authenticated && isLoading;

    return (
        <>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <BiddingBotsRouteHeader />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <BiddingBotsTable bots={bots ?? []} loading={showProgress} />
            </Grid>
        </>
    );
};
