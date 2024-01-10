import { NftEventType } from '@flipguard/domain';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { BotQueryKeys, getBots } from '../../api/requests/tracking-bots';
import { TrackersTable } from '../../components/organisms/trackers/table/TrackersTable';
import { RoutePath } from '../../config/constants/navigation';
import { useAuth } from '../../hooks/use-auth';
import { isListingTracker } from '../../utils/tracking-bots';
import { ListingTrackersRouteHeader } from './ListingTrackersRouteHeader';

export const ListingTrackersRoute = () => {
    const { authenticated } = useAuth();

    const { isLoading, data: bots } = useQuery(BotQueryKeys.list(), getBots, {
        enabled: authenticated,
    });

    const showProgress = authenticated && isLoading;
    const listingBots = (bots ?? []).filter(isListingTracker);

    return (
        <>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <ListingTrackersRouteHeader />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <TrackersTable
                    eventType={NftEventType.Listing}
                    bots={listingBots}
                    loading={showProgress}
                    editRoute={RoutePath.ListingTrackersEdit}
                />
            </Grid>
        </>
    );
};
