import { Permission } from '@flipguard/webapp-api';
import { Box, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { FlipBotGlobalSettingsQueryKeys, getGlobalSettings } from '../../../../api/requests/flipbot-global-config';
import { DelayedCircularProgress } from '../../../../components/layout/utils/DelayedCircularProgress';
import { useAuth } from '../../../../hooks/use-auth';
import { AdminPanelGlobalGuildsSettingsTab } from './GlobalGuildsSettingsTab';

export const AdminPanelFlipBotConfigServersRoute = () => {
    const { authenticated } = useAuth();
    const { user } = useAuth();

    const { isLoading, data: globalSettings } = useQuery(FlipBotGlobalSettingsQueryKeys.detail, getGlobalSettings, {
        enabled: authenticated && user.hasPermission(Permission.ADMIN),
    });

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
                <DelayedCircularProgress sx={{ color: '#fff' }} />
            </Box>
        );
    }

    if (!authenticated || !user.hasPermission(Permission.ADMIN) || !globalSettings) {
        return null;
    }

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <AdminPanelGlobalGuildsSettingsTab settings={globalSettings} />
        </Grid>
    );
};
