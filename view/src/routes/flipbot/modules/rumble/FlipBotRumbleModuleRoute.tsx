import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { Redirect } from 'wouter';

import { DelayedCircularProgress } from '../../../../components/layout/utils/DelayedCircularProgress';
import { RoutePath } from '../../../../config/constants/navigation';
import { useFlipBotContext } from '../../../../contexts/flipbot-context';
import { RumbleModuleTab, RumbleModuleTabsCard } from './FlipBotRumbleModuleTabsCard';
import { RumbleRewardsTab } from './tabs/RumbleRewardsTab';
import { RumbleWalletsTab } from './tabs/RumbleWalletsTab';

export const FlipBotRumbleModuleRoute = () => {
    const { scopedConfig, isLoading } = useFlipBotContext();

    const [currentTab, setCurrentTab] = useState<RumbleModuleTab>(RumbleModuleTab.REWARDS);

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

    const rumbleConfig = scopedConfig.modules.rumble;

    const chosenTab = (() => {
        if (currentTab === RumbleModuleTab.REWARDS) {
            return <RumbleRewardsTab configId={scopedConfig.id} config={rumbleConfig} />;
        } else if (currentTab === RumbleModuleTab.WALLETS) {
            return <RumbleWalletsTab configId={scopedConfig.id} config={rumbleConfig} />;
        } else {
            return null;
        }
    })();

    return (
        <>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <RumbleModuleTabsCard currentTab={currentTab} onTabChange={setCurrentTab} />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                {chosenTab}
            </Grid>
        </>
    );
};
