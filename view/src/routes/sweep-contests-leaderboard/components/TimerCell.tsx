import { Box } from '@mui/material';

export const SweepContestLeaderboardTimerCell = ({ unit, value }: { unit: string; value: number }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', margin: '8px' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    height: '36px',
                    width: '56px',
                    fontSize: '16px',
                }}
            >
                {unit}
            </Box>
            <Box
                sx={(theme) => ({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#181615',
                    color: theme.palette.secondary.main,
                    height: '56px',
                    width: '56px',
                    borderRadius: '8px',
                    fontSize: '24px',
                })}
            >
                {value}
            </Box>
        </Box>
    );
};
