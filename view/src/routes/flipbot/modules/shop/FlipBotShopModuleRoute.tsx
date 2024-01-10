import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { Redirect } from 'wouter';

import { DelayedCircularProgress } from '../../../../components/layout/utils/DelayedCircularProgress';
import { RoutePath } from '../../../../config/constants/navigation';
import { useFlipBotContext } from '../../../../contexts/flipbot-context';
import { FlipBotShopModuleTabsCard, ShopModuleTab } from './FlipBotShopModuleTabsCard';
import { ShopAppearanceTab } from './tabs/ShopAppearanceTab';
import { ShopItemsTab } from './tabs/ShopItemsTab';
import { ShopWalletsTab } from './tabs/ShopWalletsTab';

export const FlipBotShopModuleRoute = () => {
    const { scopedConfig, isLoading } = useFlipBotContext();

    const [currentTab, setCurrentTab] = useState<ShopModuleTab>(ShopModuleTab.APPEARANCE);

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

    const shopConfig = scopedConfig.modules.shop;

    const chosenTab = (() => {
        if (currentTab === ShopModuleTab.APPEARANCE) {
            return <ShopAppearanceTab configId={scopedConfig.id} config={shopConfig} />;
        } else if (currentTab === ShopModuleTab.ITEMS) {
            return <ShopItemsTab configId={scopedConfig.id} config={shopConfig} />;
        } else if (currentTab === ShopModuleTab.WALLETS) {
            return <ShopWalletsTab configId={scopedConfig.id} config={shopConfig} />;
        } else {
            return null;
        }
    })();

    return (
        <>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <FlipBotShopModuleTabsCard currentTab={currentTab} onTabChange={setCurrentTab} />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                {chosenTab}
            </Grid>
        </>
    );
};
