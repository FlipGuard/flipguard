import { Grid } from '@mui/material';
import React from 'react';

import { SweepContestsCreate } from './SweepContestsCreate';

export const SweepContestsCreateRoute = () => {
    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <SweepContestsCreate />
        </Grid>
    );
};
