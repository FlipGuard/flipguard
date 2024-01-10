import { BotGetDto } from '@flipguard/webapp-api';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { BotQueryKeys, getBots } from '../../api/requests/tracking-bots';
import { RoutePath } from '../../config/constants/navigation';
import { useAuth } from '../../hooks/use-auth';
import { isSnipingBot } from '../../utils/tracking-bots';
import { SnipingBotsMasonry } from './masonry/SnipingBotsMasonry';
import { SnipesHistoryTab } from './snipes-history/SnipesHistoryTab';
import { SnipingBotsTabName, SnipingBotsTabsCard } from './SnipingBotsTabsCard';

export const SnipingBotsRoute = () => {
    const [location] = useLocation();
    const { authenticated } = useAuth();

    const [currentTab, setCurrentTab] = useState<SnipingBotsTabName>(() => {
        if (location === RoutePath.SnipingBotsMySnipes) {
            return SnipingBotsTabName.USER_HISTORY;
        }
        return SnipingBotsTabName.BOTS;
    });

    const { isLoading: isLoading, data: bots = [] } = useQuery(BotQueryKeys.list(), getBots, {
        enabled: authenticated,
    });

    const showProgress = authenticated && isLoading;
    const snipingBots = bots.filter(isSnipingBot);

    return (
        <>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <SnipingBotsTabsCard currentTab={currentTab} onTabChange={setCurrentTab} />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10} sx={{ marginTop: '14px' }}>
                <CorrectTab tab={currentTab} snipingBots={snipingBots} showProgress={showProgress} />
            </Grid>
        </>
    );
};

type CorrectTabProps = {
    tab: SnipingBotsTabName;
    snipingBots: BotGetDto[];
    showProgress: boolean;
};

const CorrectTab = ({ tab, snipingBots, showProgress }: CorrectTabProps) => {
    switch (tab) {
        case SnipingBotsTabName.BOTS:
            return <SnipingBotsMasonry bots={snipingBots} loading={showProgress} />;
        case SnipingBotsTabName.USER_HISTORY:
            return <SnipesHistoryTab />;
    }
};
