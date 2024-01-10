import { Box, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Redirect } from 'wouter';

import { getSweepContestWithLeaderboard, SweepContestQueryKeys } from '../../api/requests/sweep-contests';
import { DelayedCircularProgress } from '../../components/layout/utils/DelayedCircularProgress';
import { RoutePath } from '../../config/constants/navigation';
import { SweepContestsLeaderboard } from './SweepContestsLeaderboard';

type Props = {
    sweepContestId: string;
};

export const SweepContestsLeaderboardRoute = ({ sweepContestId }: Props) => {
    const { isError, isLoading, data } = useQuery(
        SweepContestQueryKeys.leaderboard(sweepContestId),
        () => getSweepContestWithLeaderboard(sweepContestId),
        { refetchInterval: 10_000 },
    );

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <DelayedCircularProgress sx={{ color: '#fff' }} />
            </Box>
        );
    }

    if (isError && !data) {
        return <Redirect to={RoutePath.Dashboard} />;
    }

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <SweepContestsLeaderboard sweepContest={data} />
        </Grid>
    );
};
