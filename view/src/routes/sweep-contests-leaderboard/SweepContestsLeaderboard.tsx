import { SweepContestLeaderboardDto, WinnerGroup } from '@flipguard/webapp-api';
import { Box, Divider } from '@mui/material';
import { useState } from 'react';

import { WarningAlert } from '../../components/atoms/feedback/alert/WarningAlert';
import { useAuth } from '../../hooks/use-auth';
import { SweepContestLeaderboardHeader } from './components/Header';
import { SweepContestLeaderboardTable } from './components/leaderboard/LeaderboardTable';
import { SweepContestSalesTable } from './components/sales/SalesTable';
import { WinnerGroups } from './components/WinnerGroups';

type Props = {
    sweepContest: SweepContestLeaderboardDto;
};

export const SweepContestsLeaderboard = ({ sweepContest }: Props) => {
    const { user } = useAuth();
    const { ended, active, config } = sweepContest;

    const [inSalesView, setInSalesView] = useState(false);
    const [activeGroup, setActiveGroup] = useState<string>(config.winnerGroups[0].name);

    const isAdminView = user.details.id === sweepContest.creator.id;
    const isPublic = sweepContest.detailed ? sweepContest.settings.public : true;

    return (
        <Box>
            <SweepContestLeaderboardHeader
                sweepContest={sweepContest}
                inSalesView={inSalesView}
                setInSalesView={setInSalesView}
            />
            <Divider sx={{ margin: '16px 0', borderStyle: 'dashed' }} />
            {inSalesView ? (
                <SweepContestSalesTable isAdminView={isAdminView} sweepContest={sweepContest} />
            ) : (
                <>
                    {isAdminView && !isPublic && (
                        <WarningAlert sx={{ marginBottom: '16px' }}>
                            This leaderboard is not public. Enable public leaderboard option in sweep contest settings
                            so everyone can see it.
                        </WarningAlert>
                    )}
                    {isAdminView && !ended && !active && (
                        <WarningAlert sx={{ marginBottom: '16px' }}>
                            This sweep contest is stopped. Start it so the leaderboard can update in real-time.
                        </WarningAlert>
                    )}
                    <WinnerGroups
                        sx={{ margin: '16px 0' }}
                        winnerGroups={config.winnerGroups.map((wg) => wg.name)}
                        activeGroup={activeGroup}
                        onGroupChange={setActiveGroup}
                    />
                    <SweepContestLeaderboardTable
                        isAdminView={isAdminView}
                        winnerGroup={config.winnerGroups.find((w) => w.name === activeGroup) as WinnerGroup}
                        sweepContest={sweepContest}
                    />
                </>
            )}
        </Box>
    );
};
