import { Grid } from '@mui/material';
import React from 'react';

import { AlertsBotDescriptionCard } from './AlertsBotDescriptionCard';
import { AlertsBotRouteHeader } from './AlertsBotRouteHeader';
import { AlertsPreview } from './AlertsPreview';

export const AlertsBotRoute = () => {
    return (
        <>
            <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                <AlertsBotRouteHeader />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                <AlertsPreview />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                <AlertsBotDescriptionCard />
            </Grid>
        </>
    );
};
