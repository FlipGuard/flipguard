import { Box, CardProps } from '@mui/material';

import { CustomTabsCard } from '../../../../components/molecules/tabs/CustomTabsCard';

export const RaidingModuleTab = {
    RAIDS: 'RAIDS',
    REWARD_POOLS: 'REWARD_POOLS',
    SETTINGS: 'SETTINGS',
    WALLETS: 'WALLETS',
} as const;

export type RaidingModuleTab = (typeof RaidingModuleTab)[keyof typeof RaidingModuleTab];

type Props = CardProps & {
    currentTab: RaidingModuleTab;
    onTabChange: (tab: RaidingModuleTab) => void;
};

export const RaidingModuleTabsCard = ({ currentTab, onTabChange, ...props }: Props) => {
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
                    [RaidingModuleTab.RAIDS]: { name: 'Raids' },
                    [RaidingModuleTab.REWARD_POOLS]: { name: 'Rewards' },
                    [RaidingModuleTab.SETTINGS]: { name: 'Settings' },
                    [RaidingModuleTab.WALLETS]: { name: 'Wallets' },
                }}
                activeTab={currentTab}
                onTabChange={onTabChange as (str: string) => void}
                {...props}
            />
        </Box>
    );
};
