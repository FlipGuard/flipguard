import { SweepContestLeaderboardDto } from '@flipguard/webapp-api';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import { DiscordAvatar } from '../../../components/atoms/data-display/DiscordAvatar';
import { CustomTabsCard } from '../../../components/molecules/tabs/CustomTabsCard';
import { SweepContestLeaderboardTimer } from './Timer';

type Props = {
    sweepContest: SweepContestLeaderboardDto;
    inSalesView: boolean;
    setInSalesView: (v: boolean) => void;
};

export const SweepContestLeaderboardHeader = ({ sweepContest, inSalesView, setInSalesView }: Props) => {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                    <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { fontSize: '28px' } }}>
                        <Typography sx={{ fontSize: '28px', fontWeight: 500 }}>{sweepContest.name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DiscordAvatar
                            sx={{ width: '24px', height: '24px' }}
                            userId={sweepContest.creator.id}
                            avatar={sweepContest.creator.avatar}
                        />
                        <Typography sx={{ marginLeft: '6px', color: '#aaa' }}>Created by</Typography>
                        <Typography sx={{ marginLeft: '4px' }}>{sweepContest.creator.username}</Typography>
                    </Box>
                    <Box sx={{ marginTop: '16px' }}>
                        <CustomTabsCard
                            tabs={{
                                false: { name: 'Leaderboard' },
                                true: { name: 'Sales feed' },
                            }}
                            activeTab={'' + inSalesView}
                            onTabChange={(t) => setInSalesView(t === 'true')}
                        />
                    </Box>
                    <Box sx={{ marginTop: '16px' }}>
                        <Typography sx={{ whiteSpace: 'break-spaces', fontSize: '16px' }}>
                            {sweepContest.description || '-'}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5} xl={5} sx={{ minHeight: '256px' }}>
                    <SweepContestLeaderboardTimer ended={sweepContest.ended} endTime={sweepContest.endTime} />
                </Grid>
            </Grid>
        </Box>
    );
};
