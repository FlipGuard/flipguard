import { Box, Grid } from '@mui/material';
import React from 'react';

import { DelayedCircularProgress } from '../../../components/layout/utils/DelayedCircularProgress';
import { NoDataFallback } from '../../../components/molecules/utils/NoDataFallback';
import { useFlipBotContext } from '../../../contexts/flipbot-context';
import { useAuth } from '../../../hooks/use-auth';
import { FlipBotDashboard } from './FlipBotDashboard';

export const FlipBotDashboardRoute = () => {
    const { authenticated } = useAuth();
    const { isLoading } = useFlipBotContext();

    if (!authenticated) {
        return <NoDataFallback text={'Sign in to have access to this view'} />;
    }

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
                <DelayedCircularProgress sx={{ color: '#fff' }} />
            </Box>
        );
    }

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <FlipBotDashboard />
        </Grid>
    );
};
