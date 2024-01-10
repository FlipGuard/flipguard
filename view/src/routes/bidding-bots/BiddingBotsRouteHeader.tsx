import { Permission } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { Redirect, useLocation } from 'wouter';

import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { RoutePath } from '../../config/constants/navigation';
import { useAuth } from '../../hooks/use-auth';
import isViewMobile from '../../hooks/utils/isViewMobile';

const DESCRIPTION = 'Place NFT collection offers automatically';

export const BiddingBotsRouteHeader = () => {
    const [, setLocation] = useLocation();
    const { user } = useAuth();
    const isMobile = isViewMobile();

    const disabled = user.usedBiddingBotsIds().length >= user.limits.maxBiddingBots;

    if (!user.hasOneOfPermissions(Permission.ADMIN, Permission.BIDDING)) {
        return <Redirect to={RoutePath.Dashboard} />;
    }

    return (
        <>
            {isMobile && <Typography>{DESCRIPTION}</Typography>}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    placeContent: 'flex-end',
                    marginTop: isMobile ? '24px' : '16px',
                }}
            >
                {!isMobile && <Typography sx={{ marginBottom: '16px' }}>{DESCRIPTION}</Typography>}
                <Typography sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: isMobile ? 0 : '16px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}></Box>
                    <PrimaryButton
                        onClick={() => setLocation(RoutePath.BiddingBotsCreate)}
                        disabled={disabled}
                        tooltipMessage={disabled ? 'You cannot create more bidding bots' : undefined}
                    >
                        Create Bot
                    </PrimaryButton>
                </Box>
            </Box>
        </>
    );
};
