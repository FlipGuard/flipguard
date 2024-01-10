import { Box, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'wouter';

import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { RoutePath } from '../../config/constants/navigation';
import isViewMobile from '../../hooks/utils/isViewMobile';

const MSG = 'Track listings from your collection';

export const ListingTrackersRouteHeader = () => {
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
                    <PrimaryButton onClick={() => setLocation(RoutePath.ListingTrackersCreate)}>
                        Create Tracker
                    </PrimaryButton>
                </Box>
            </Box>
        </>
    );
};
