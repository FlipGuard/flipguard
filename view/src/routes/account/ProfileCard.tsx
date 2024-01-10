import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import { Box, Card, Typography } from '@mui/material';
import React from 'react';

import { useRequestSyncMutation } from '../../api/mutations/sync';
import { DiscordAvatar } from '../../components/atoms/data-display/DiscordAvatar';
import { FadingTooltip } from '../../components/atoms/feedback/tooltip/FadingTooltip';
import { LoadingIconButton } from '../../components/atoms/inputs/button/LoadingIconButton';
import { useAuth } from '../../hooks/use-auth';
import isViewMobile from '../../hooks/utils/isViewMobile';

export const ProfileCard = () => {
    const isMobile = isViewMobile();
    const { user, flipProfile } = useAuth();

    const { mutation: requestSyncMutation, syncing, disabled } = useRequestSyncMutation();

    const onSync = () => {
        requestSyncMutation.mutate();
    };

    const { avatar, username } = user.model.display;

    return (
        <Card
            sx={{
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                marginTop: isMobile ? '0px' : '16px',
            }}
        >
            <Box sx={{ display: 'flex', flexWrap: 'reversed', alignItems: 'flex-start', margin: '8px' }}>
                <DiscordAvatar sx={{ width: '96px', height: '96px' }} userId={user.id} avatar={avatar} />
                <Box sx={{ marginLeft: '16px', minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '22px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {flipProfile?.flipguardDomain ?? username}
                        </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '16px', color: '#aaa', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {`@${username}`}
                    </Typography>
                </Box>
                <Typography sx={{ flexGrow: 1 }} />
                <Box>
                    <FadingTooltip title={'Synchronize account information'} placement={'top'}>
                        <span>
                            <LoadingIconButton onClick={onSync} loading={syncing} disabled={disabled}>
                                <SyncOutlinedIcon />
                            </LoadingIconButton>
                        </span>
                    </FadingTooltip>
                </Box>
            </Box>
        </Card>
    );
};
