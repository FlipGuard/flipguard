import { Box, Card, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { SweepContestLeaderboardTimerCell } from './TimerCell';

const Container = styled(Card)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    height: '100%',
});

type Props = {
    ended: boolean;
    endTime: number;
};

export const SweepContestLeaderboardTimer = ({ endTime, ended }: Props) => {
    const [timeLeft, setTimeLeft] = useState(Math.max(0, new Date(endTime).getTime() - Date.now()));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(Math.max(0, new Date(endTime).getTime() - Date.now()));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const daysLeft = Math.floor(timeLeft / (24 * 3600 * 1000));
    const hoursLeft = Math.floor(timeLeft / (3600 * 1000)) % 24;
    const minutesLeft = Math.floor(timeLeft / (60 * 1000)) % 60;
    const secondsLeft = Math.floor(timeLeft / 1000) % 60;

    if (endTime < Date.now() && !ended) {
        return (
            <Container sx={{ flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '24px', fontWeight: 500, textAlign: 'center' }}>PICKING WINNERS</Typography>
                <AnimatedThreeDots maxDots={5} />
            </Container>
        );
    }

    if (ended) {
        return (
            <Container sx={{ flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '24px', fontWeight: 500, textAlign: 'center' }}>
                    CONTEST HAS ENDED
                </Typography>
                <Typography sx={{ fontSize: '16px', color: '#aaa', textAlign: 'center' }}>
                    Check winners in the leaderboard(s) below
                </Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '28px', fontWeight: 500 }}>ENDS IN</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
                    <SweepContestLeaderboardTimerCell unit={'D'} value={daysLeft} />
                    <SweepContestLeaderboardTimerCell unit={'H'} value={hoursLeft} />
                    <SweepContestLeaderboardTimerCell unit={'M'} value={minutesLeft} />
                    <SweepContestLeaderboardTimerCell unit={'S'} value={secondsLeft} />
                </Box>
            </Box>
        </Container>
    );
};

const AnimatedThreeDots = ({ maxDots }: { maxDots: number }) => {
    const [dotCount, setDotCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setDotCount((prev) => (prev + 1) % maxDots);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Typography sx={{ fontSize: '20px', color: '#aaa', textAlign: 'center' }}>
            {'.'.repeat(dotCount + 1)}
        </Typography>
    );
};
