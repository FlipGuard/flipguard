import {
    FlipProfileGetDto,
    getExpForFlipLevel,
    getFlipLevelForExp,
    PublicFlipProfileGetDto,
} from '@flipguard/webapp-api';
import { Box, BoxProps, LinearProgress, Typography } from '@mui/material';
import React from 'react';

type Props = BoxProps & {
    flipProfile: FlipProfileGetDto | PublicFlipProfileGetDto;
};

export const LevelProgressBar = ({ flipProfile, ...props }: Props) => {
    const totalExp = Object.values(flipProfile.experience).reduce((a, b) => a + b, 0);
    const [level, requiredExp] = getFlipLevelForExp(totalExp);

    const prevLevelExp = getExpForFlipLevel(level);
    const relativeExp = totalExp - prevLevelExp;
    const relativeExpForNextlevel = requiredExp - prevLevelExp;

    const expPercentage = (relativeExp / relativeExpForNextlevel) * 100;

    return (
        <Box {...props}>
            <Typography
                sx={{ marginBottom: '4px' }}
            >{`Lvl ${level} (${relativeExp}/${relativeExpForNextlevel})`}</Typography>
            <LinearProgress
                sx={(theme) => ({
                    borderRadius: '12px',
                    background: `${theme.palette.tertiary.dark}88`,
                    '& .MuiLinearProgress-bar': { background: theme.palette.tertiary.main },
                })}
                color={'success'}
                variant={'determinate'}
                value={expPercentage}
            />
        </Box>
    );
};
