import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { Redirect } from 'wouter';

import { DelayedCircularProgress } from '../../../../components/layout/utils/DelayedCircularProgress';
import { RoutePath } from '../../../../config/constants/navigation';
import { useFlipBotContext } from '../../../../contexts/flipbot-context';
import { RaidingModuleTab, RaidingModuleTabsCard } from './FlipBotRaidingModuleTabsCard';
import { RaidingRaidsTab } from './tabs/raids/RaidingRaidsTab';
import { RaidingRewardsTab } from './tabs/rewards/RaidingRewardsTab';
import { RaidingSettingsTab } from './tabs/settings/RaidingSettingsTab';
import { RaidingWalletsTab } from './tabs/wallets/RaidingWalletsTab';

export const FlipBotRaidingModuleRoute = () => {
    const { scopedConfig, isLoading } = useFlipBotContext();

    const [currentTab, setCurrentTab] = useState<RaidingModuleTab>(RaidingModuleTab.RAIDS);

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

    const raidingConfig = scopedConfig.modules.raiding;

    const chosenTab = (() => {
        if (currentTab === RaidingModuleTab.RAIDS) {
            return <RaidingRaidsTab config={raidingConfig} configId={scopedConfig.id} />;
        } else if (currentTab === RaidingModuleTab.REWARD_POOLS) {
            return <RaidingRewardsTab config={raidingConfig} configId={scopedConfig.id} />;
        } else if (currentTab === RaidingModuleTab.SETTINGS) {
            return <RaidingSettingsTab config={raidingConfig} configId={scopedConfig.id} />;
        } else if (currentTab === RaidingModuleTab.WALLETS) {
            return <RaidingWalletsTab config={raidingConfig} configId={scopedConfig.id} />;
        } else {
            return null;
        }
    })();

    return (
        <>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <RaidingModuleTabsCard currentTab={currentTab} onTabChange={setCurrentTab} />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                {chosenTab}
            </Grid>
        </>
    );
};
