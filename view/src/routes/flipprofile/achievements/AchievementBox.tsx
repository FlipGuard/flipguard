import { formatNumberForUi } from '@flipguard/commons';
import { FlipProfileAchievementStatus, FlipProfileAchievementType, getAchievementMeta } from '@flipguard/webapp-api';
import { Box, BoxProps, LinearProgress, styled, Typography } from '@mui/material';
import React from 'react';

import FallbackIconUrl from '../../../assets/flipguard-logo.svg';

const Container = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'unlocked',
})<BoxProps & { unlocked: boolean }>(({ theme, unlocked }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: theme.palette.primary.dark,
    padding: '8px 12px',
    border: `1px solid ${unlocked ? theme.palette.secondary.main + '66' : 'transparent'}`,
    borderRadius: '8px',
    margin: '4px',
    opacity: unlocked ? 1 : 0.5,
    '& .achievement-progress-label': {
        display: 'none',
    },
    '&:hover .achievement-progress-label': {
        display: 'block',
    },
}));

type Props = BoxProps & {
    type: FlipProfileAchievementType;
    status: FlipProfileAchievementStatus;
};

export const AchievementBox = ({ type, status, ...props }: Props) => {
    const { name, description, requiredProgress } = getAchievementMeta(type);
    const unlocked = status.unlocked;

    const progress = ((status.progress ?? 0) / (requiredProgress ?? 1)) * 100;

    return (
        <Container unlocked={unlocked} {...props}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                        sx={(theme) => ({
                            fontSize: '0.95rem',
                            textTransform: 'uppercase',
                            fontWeight: 400,
                            color: theme.palette.secondary.dark,
                        })}
                    >
                        {name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem' }}>{description}</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#111',
                        border: '1px solid #2a2a2a',
                        borderRadius: '6px',
                    }}
                >
                    <img src={FallbackIconUrl} alt={''} width={40} height={40} />
                </Box>
            </Box>
            <Box sx={{ position: 'relative' }}>
                <LinearProgress
                    sx={(theme) => ({
                        marginTop: '6px',
                        borderRadius: '12px',
                        background: `${theme.palette.tertiary.dark}88`,
                        '& .MuiLinearProgress-bar': { background: theme.palette.tertiary.main },
                    })}
                    color={'success'}
                    variant={'determinate'}
                    value={progress}
                />
                <Typography
                    className={'achievement-progress-label'}
                    sx={{
                        position: 'absolute',
                        top: '70%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '12px',
                        textShadow: '2px 2px 4px #000',
                    }}
                >{`${formatNumberForUi(progress)}%`}</Typography>
            </Box>
        </Container>
    );
};
