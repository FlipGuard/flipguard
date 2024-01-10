import { NftEventType } from '@flipguard/domain';
import { Grid } from '@mui/material';
import React from 'react';

import { TrackerCreateForm } from '../../components/organisms/trackers/create/TrackerCreateForm';
import { RoutePath } from '../../config/constants/navigation';

export const ListingTrackersCreateRoute = () => {
    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <TrackerCreateForm eventType={NftEventType.Listing} returnPath={RoutePath.ListingTrackers} />
        </Grid>
    );
};
