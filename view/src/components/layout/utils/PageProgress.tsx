import { Box, Grid } from '@mui/material';
import React from 'react';

import { DelayedCircularProgress } from './DelayedCircularProgress';

export const PageProgress = () => {
    return (
        <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                <DelayedCircularProgress sx={{ color: '#fff' }} />
            </Box>
        </Grid>
    );
};
