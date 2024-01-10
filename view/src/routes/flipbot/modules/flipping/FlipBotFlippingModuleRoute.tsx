import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { Redirect } from 'wouter';

import { DelayedCircularProgress } from '../../../../components/layout/utils/DelayedCircularProgress';
import { RoutePath } from '../../../../config/constants/navigation';
import { useFlipBotContext } from '../../../../contexts/flipbot-context';
import { FlippingModuleTab, FlippingModuleTabsCard } from './FlipBotFlippingModuleTabsCard';
import { FlipBotFlippingModuleBetsCard } from './tabs/FlipBotFlippingModuleBetsCard';
import { FlipBotFlippingModuleDashboardCard } from './tabs/FlipBotFlippingModuleDashboardCard';
import { FlipBotFlippingModuleEventCard } from './tabs/FlipBotFlippingModuleEventCard';
import { FlipBotFlippingModuleFeesCard } from './tabs/FlipBotFlippingModuleFeesCard';
import { FlipBotFlippingModuleOddsCard } from './tabs/FlipBotFlippingModuleOddsCard';
import { FlipBotFlippingModuleSettingsCard } from './tabs/FlipBotFlippingModuleSettingsCard';
import { FlipBotFlippingModuleWalletsCard } from './tabs/FlipBotFlippingModuleWalletsCard';

export const FlipBotFlippingModuleRoute = () => {
    const { scopedConfig, isLoading } = useFlipBotContext();

    const [currentTab, setCurrentTab] = useState<FlippingModuleTab>(FlippingModuleTab.DASHBOARD);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
                <DelayedCircularProgress sx={{ color: '#fff' }} />
            </Box>
        );
    }

    if (!scopedConfig) {
        return <Redirect to={RoutePath.FlipBot} />;
    }

    const flippingConfig = scopedConfig.modules.flipping;

    const chosenTab = (() => {
        if (currentTab === FlippingModuleTab.DASHBOARD) {
            return <FlipBotFlippingModuleDashboardCard configId={scopedConfig.id} config={flippingConfig} />;
        } else if (currentTab === FlippingModuleTab.WALLETS) {
            return <FlipBotFlippingModuleWalletsCard configId={scopedConfig.id} config={flippingConfig} />;
        } else if (currentTab === FlippingModuleTab.FEES) {
            return <FlipBotFlippingModuleFeesCard configId={scopedConfig.id} config={flippingConfig} />;
        } else if (currentTab === FlippingModuleTab.ODDS) {
            return <FlipBotFlippingModuleOddsCard configId={scopedConfig.id} config={flippingConfig} />;
        } else if (currentTab === FlippingModuleTab.BETS) {
            return <FlipBotFlippingModuleBetsCard configId={scopedConfig.id} config={flippingConfig} />;
        } else if (currentTab === FlippingModuleTab.SETTINGS) {
            return <FlipBotFlippingModuleSettingsCard configId={scopedConfig.id} config={flippingConfig} />;
        } else if (currentTab === FlippingModuleTab.EVENT) {
            return <FlipBotFlippingModuleEventCard configId={scopedConfig.id} config={flippingConfig} />;
        } else {
            return null;
        }
    })();

    return (
        <>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <FlippingModuleTabsCard currentTab={currentTab} onTabChange={setCurrentTab} />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                {chosenTab}
            </Grid>
        </>
    );
};
