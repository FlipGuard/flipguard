import { Box, CardProps } from '@mui/material';

import { CustomTabsCard } from '../../../../components/molecules/tabs/CustomTabsCard';

export const FlippingModuleTab = {
    DASHBOARD: 'DASHBOARD',
    WALLETS: 'WALLETS',
    FEES: 'FEES',
    EVENT: 'EVENT',
    ODDS: 'ODDS',
    BETS: 'BETS',
    SETTINGS: 'SETTINGS',
} as const;

export type FlippingModuleTab = (typeof FlippingModuleTab)[keyof typeof FlippingModuleTab];

type Props = CardProps & {
    currentTab: FlippingModuleTab;
    onTabChange: (tab: FlippingModuleTab) => void;
};

export const FlippingModuleTabsCard = ({ currentTab, onTabChange, ...props }: Props) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <CustomTabsCard
                tabs={{
                    [FlippingModuleTab.DASHBOARD]: { name: 'Dashboard', withDivider: true },
                    [FlippingModuleTab.BETS]: { name: 'Bets' },
                    [FlippingModuleTab.EVENT]: { name: 'Event' },
                    [FlippingModuleTab.FEES]: { name: 'Fees' },
                    [FlippingModuleTab.ODDS]: { name: 'Odds' },
                    [FlippingModuleTab.WALLETS]: { name: 'Wallets' },
                    [FlippingModuleTab.SETTINGS]: { name: 'Webhooks' },
                }}
                activeTab={currentTab}
                onTabChange={onTabChange as (str: string) => void}
                {...props}
            />
        </Box>
    );
};
