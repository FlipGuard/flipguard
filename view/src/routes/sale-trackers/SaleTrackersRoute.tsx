import { NftEventType } from '@flipguard/domain';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { BotQueryKeys, getBots } from '../../api/requests/tracking-bots';
import { TrackersTable } from '../../components/organisms/trackers/table/TrackersTable';
import { RoutePath } from '../../config/constants/navigation';
import { useAuth } from '../../hooks/use-auth';
import { isSaleTracker } from '../../utils/tracking-bots';
import { SaleTrackersRouteHeader } from './SaleTrackersRouteHeader';

export const SaleTrackersRoute = () => {
    const { authenticated } = useAuth();

    const { isLoading, data: bots } = useQuery(BotQueryKeys.list(), getBots, {
        enabled: authenticated,
    });

    const showProgress = authenticated && isLoading;
    const saleBots = (bots ?? []).filter(isSaleTracker);

    return (
        <>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <SaleTrackersRouteHeader />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <TrackersTable
                    eventType={NftEventType.Sale}
                    bots={saleBots}
                    loading={showProgress}
                    editRoute={RoutePath.SaleTrackersEdit}
                />
            </Grid>
        </>
    );
};
