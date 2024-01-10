import { FlipProfileGetDto, PublicFlipProfileGetDto } from '@flipguard/webapp-api';
import { Box, Card, Typography } from '@mui/material';
import React from 'react';

import { DiscordAvatar } from '../../../components/atoms/data-display/DiscordAvatar';
import isViewMobile from '../../../hooks/utils/isViewMobile';
import { LevelProgressBar } from './LevelProgressBar';

type Props = {
    userId: string;
    flipProfile: FlipProfileGetDto | PublicFlipProfileGetDto;
};

export const FlipProfileAvatarCard = ({ userId, flipProfile }: Props) => {
    const isMobile = isViewMobile();

    return (
        <Card
            sx={{
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '16px',
                marginTop: isMobile ? '0px' : '16px',
                height: isMobile ? 'auto' : 'calc(100% - 16px)',
            }}
        >
            <Box sx={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DiscordAvatar userId={userId} avatar={flipProfile.avatar} sx={{ width: '96px', height: '96px' }} />
            </Box>
            <Box
                sx={{
                    marginTop: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <LevelProgressBar flipProfile={flipProfile} sx={{ width: '90%', textAlign: 'center' }} />
                <Typography
                    sx={{ marginTop: '12px', fontSize: '1.2rem', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                    {flipProfile.username}
                </Typography>
            </Box>
        </Card>
    );
};
