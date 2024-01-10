import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Redirect } from 'wouter';

import { getSweepContests, SweepContestQueryKeys } from '../../api/requests/sweep-contests';
import { RoutePath } from '../../config/constants/navigation';
import { useAuth } from '../../hooks/use-auth';
import { SweepContestsEdit } from './SweepContestsEdit';

type Props = {
    sweepContestId: string;
};

export const SweepContestsEditRoute = ({ sweepContestId }: Props) => {
    const { authenticated } = useAuth();

    const { isLoading: isLoading, data: sweepContests } = useQuery(SweepContestQueryKeys.list(), getSweepContests, {
        enabled: authenticated,
    });

    if (isLoading || sweepContests === undefined) {
        return null;
    }

    const sweepContest = sweepContests.find((sc) => sc.id === sweepContestId);
    if (!sweepContest) {
        return <Redirect to={RoutePath.Dashboard} />;
    }

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <SweepContestsEdit originalSweepContest={sweepContest} />
        </Grid>
    );
};
