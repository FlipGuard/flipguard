import { Grid } from '@mui/material';
import React from 'react';

import { FlipBotDashboardDetails } from './metadata/FlipBotDashboardDetails';
import { FlipBotDashboardModuleInfo } from './module-info/FlipBotDashboardModuleInfo';

export const FlipBotDashboard = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                <FlipBotDashboardDetails />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                <FlipBotDashboardModuleInfo />
            </Grid>
        </Grid>
    );
};
