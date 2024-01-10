import { Divider, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { NoDataFallback } from '../../components/molecules/utils/NoDataFallback';
import { RoutePath } from '../../config/constants/navigation';
import { useAuth } from '../../hooks/use-auth';
import { AccountTabName, AccountTabsCard } from './AccountTabsCard';
import { AccountConnectionsTabCard } from './connections/AccountConnectionsTabCard';
import { AccountGeneralTabCard } from './general/AccountGeneralTabCard';
import { ProfileCard } from './ProfileCard';
import { AccountReferralPayoutsCard } from './referrals/AccountReferralPayoutsCard';
import { AccountReferralsTabCard } from './referrals/AccountReferralsTabCard';
import { AccountSettingsTabCard } from './settings/AccountSettingsTabCard';

export const AccountRoute = () => {
    const [location] = useLocation();
    const { authenticated } = useAuth();

    const [currentTab, setCurrentTab] = useState<AccountTabName>(() => {
        if (location === RoutePath.AccountConnections) {
            return AccountTabName.CONNECTIONS;
        } else if (location === RoutePath.AccountReferrals) {
            return AccountTabName.REFERRALS;
        } else if (location === RoutePath.AccountSettings) {
            return AccountTabName.SETTINGS;
        } else {
            return AccountTabName.GENERAL;
        }
    });

    if (!authenticated) {
        return (
            <Grid item xs={12}>
                <NoDataFallback text={'Sign in to have access to this view'} />
            </Grid>
        );
    }

    const chosenTab = (() => {
        if (currentTab === AccountTabName.GENERAL) {
            return <AccountGeneralTabCard />;
        } else if (currentTab === AccountTabName.CONNECTIONS) {
            return <AccountConnectionsTabCard />;
        } else if (currentTab === AccountTabName.SETTINGS) {
            return <AccountSettingsTabCard />;
        } else if (currentTab === AccountTabName.REFERRALS) {
            return (
                <>
                    <AccountReferralsTabCard />
                    <Divider sx={{ margin: '12px 4px 12px 4px', borderStyle: 'dashed' }} />
                    <AccountReferralPayoutsCard />
                </>
            );
        } else {
            return null;
        }
    })();

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <ProfileCard />
            <AccountTabsCard sx={{ margin: '8px 0' }} activeTab={currentTab} onTabChange={setCurrentTab} />
            {chosenTab}
        </Grid>
    );
};
