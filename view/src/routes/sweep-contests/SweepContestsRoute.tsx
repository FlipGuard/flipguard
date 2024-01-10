import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { getSweepContests, SweepContestQueryKeys } from '../../api/requests/sweep-contests';
import { useAuth } from '../../hooks/use-auth';
import { SweepContestsRouteHeader } from './SweepContestsRouteHeader';
import { SweepContestsTable } from './table/SweepContestsTable';

export const SweepContestsRoute = () => {
    const { authenticated } = useAuth();

    const { isLoading, data: sweepContests = [] } = useQuery(SweepContestQueryKeys.list(), getSweepContests, {
        enabled: authenticated,
    });

    const showProgress = authenticated && isLoading;

    return (
        <>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <SweepContestsRouteHeader />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <SweepContestsTable sweepContests={sweepContests} loading={showProgress} />
            </Grid>
        </>
    );
};
