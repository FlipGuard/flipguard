import { Permission } from '@flipguard/webapp-api';
import { Box, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import { FlipBotGlobalSettingsQueryKeys, getGlobalSettings } from '../../../../api/requests/flipbot-global-config';
import { DelayedCircularProgress } from '../../../../components/layout/utils/DelayedCircularProgress';
import { CustomTabsCard } from '../../../../components/molecules/tabs/CustomTabsCard';
import { useAuth } from '../../../../hooks/use-auth';
import { AdminPanelRaidingSettingsCard } from './RaidingSettingsCard';

const Routes = {
    SETTINGS: 'SETTINGS',
} as const;

export const AdminPanelFlipBotConfigRaidingRoute = () => {
    const { authenticated } = useAuth();
    const { user } = useAuth();

    const [activeRoute, setActiveRoute] = useState(Routes.SETTINGS);

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

    const route = (() => {
        if (activeRoute === Routes.SETTINGS) {
            return <AdminPanelRaidingSettingsCard settings={globalSettings.raiding} />;
        } else {
            return null;
        }
    })();

    return (
        <>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <CustomTabsCard
                    tabs={{
                        [Routes.SETTINGS]: { name: 'Settings' },
                    }}
                    activeTab={activeRoute}
                    onTabChange={setActiveRoute as (tab: string) => void}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                {route}
            </Grid>
        </>
    );
};
