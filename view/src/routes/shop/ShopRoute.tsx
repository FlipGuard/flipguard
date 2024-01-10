import { WalletChain } from '@flipguard/webapp-api';
import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { RoutePath } from '../../config/constants/navigation';
import { ShopIndividualTab } from './individual/ShopIndividualTab';
import { ShopOrdersTab } from './orders/ShopOrdersTab';
import { ShopTabName, ShopTabsCard } from './ShopTabsCard';
import { ShopTeamTab } from './team/ShopTeamTab';

const CHAIN = WalletChain.Polygon;

export const ShopRoute = () => {
    const [location] = useLocation();

    const [areOrdersCancellable, setAreOrdersCancellable] = useState(true);

    const [currentTab, setCurrentTab] = useState<ShopTabName>(() => {
        if (location === RoutePath.ShopIndividual) {
            return ShopTabName.INDIVIDUAL;
        } else if (location === RoutePath.ShopOrders) {
            return ShopTabName.ORDERS;
        }
        return ShopTabName.TEAM;
    });

    return (
        <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
            <ShopTabsCard currentTab={currentTab} onTabChange={setCurrentTab} />
            <Box sx={{ padding: 0, marginTop: '16px' }}>
                <ShopTab
                    tab={currentTab}
                    chain={CHAIN}
                    areOrdersCancellable={areOrdersCancellable}
                    setAreOrdersCancellable={setAreOrdersCancellable}
                />
            </Box>
        </Grid>
    );
};

type ShopTabProps = {
    tab: ShopTabName;
    chain: WalletChain;
    areOrdersCancellable: boolean;
    setAreOrdersCancellable: (value: boolean) => void;
};

const ShopTab = ({ tab, chain, areOrdersCancellable, setAreOrdersCancellable }: ShopTabProps) => {
    switch (tab) {
        case ShopTabName.TEAM:
            return <ShopTeamTab chain={chain} setAreOrdersCancellable={setAreOrdersCancellable} />;
        case ShopTabName.INDIVIDUAL:
            return <ShopIndividualTab chain={chain} setAreOrdersCancellable={setAreOrdersCancellable} />;
        case ShopTabName.ORDERS:
            return <ShopOrdersTab areOrdersCancellable={areOrdersCancellable} />;
        default:
            return null;
    }
};
