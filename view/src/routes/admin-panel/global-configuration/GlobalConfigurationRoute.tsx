import { Permission } from '@flipguard/webapp-api';
import { Box, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { getCustomGlobalConfiguration, GlobalConfigQueryKeys } from '../../../api/requests/global-configuration';
import { DelayedCircularProgress } from '../../../components/layout/utils/DelayedCircularProgress';
import { useAuth } from '../../../hooks/use-auth';
import { DiscordServerGlobalConfigurationCard } from './DiscordServerGlobalConfigurationCard';

export const AdminPanelGlobalConfigurationRoute = () => {
    const { user, authenticated } = useAuth();

    const { data: discordServerConfig, isLoading } = useQuery(
        GlobalConfigQueryKeys.custom(),
        getCustomGlobalConfiguration,
    );

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
                <DelayedCircularProgress sx={{ color: '#fff' }} />
            </Box>
        );
    }

    if (!authenticated || !user.hasPermission(Permission.ADMIN) || !discordServerConfig) {
        return null;
    }

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <DiscordServerGlobalConfigurationCard config={discordServerConfig} />
        </Grid>
    );
};
