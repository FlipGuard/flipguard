import { FlipBotModuleRaidingSettings } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'wouter';

import { PrimaryButton } from '../../../../../../components/atoms/inputs/button/PrimaryButton';
import { RoutePath } from '../../../../../../config/constants/navigation';
import isViewMobile from '../../../../../../hooks/utils/isViewMobile';

const MSG = 'Manage your Twitter raids';

type Props = {
    config: FlipBotModuleRaidingSettings;
};

export const RaidingRaidsTabHeader = ({ config }: Props) => {
    const [, setLocation] = useLocation();
    const isMobile = isViewMobile();

    return (
        <>
            {isMobile && <Typography>{MSG}</Typography>}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    placeContent: 'flex-end',
                    marginTop: isMobile ? '24px' : '16px',
                }}
            >
                {!isMobile && <Typography sx={{ marginBottom: '16px' }}>{MSG}</Typography>}
                <Typography sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: isMobile ? 0 : '16px' }}>
                    <PrimaryButton
                        disabled={Object.keys(config.raids).length >= 16}
                        onClick={() => setLocation(RoutePath.FlipBotModuleRaidingCreate)}
                    >
                        Create Raid
                    </PrimaryButton>
                </Box>
            </Box>
        </>
    );
};
