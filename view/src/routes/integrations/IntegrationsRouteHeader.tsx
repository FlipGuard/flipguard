import { Box, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'wouter';

import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { RoutePath } from '../../config/constants/navigation';
import isViewMobile from '../../hooks/utils/isViewMobile';

const DESCRIPTION = 'Integrate bots with your favorite services';

export const IntegrationsRouteHeader = () => {
    const [, setLocation] = useLocation();
    const isMobile = isViewMobile();

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
                    <PrimaryButton onClick={() => setLocation(RoutePath.IntegrationsAdd)}>
                        Add Integration
                    </PrimaryButton>
                </Box>
            </Box>
        </>
    );
};
