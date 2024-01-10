import { Box, CardProps } from '@mui/material';

import { CustomTabsCard } from '../../../../components/molecules/tabs/CustomTabsCard';

export const RumbleModuleTab = {
    REWARDS: 'REWARDS',
    WALLETS: 'WALLETS',
} as const;

export type RumbleModuleTab = (typeof RumbleModuleTab)[keyof typeof RumbleModuleTab];

type Props = CardProps & {
    currentTab: RumbleModuleTab;
    onTabChange: (tab: RumbleModuleTab) => void;
};

export const RumbleModuleTabsCard = ({ currentTab, onTabChange, ...props }: Props) => {
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
                    [RumbleModuleTab.REWARDS]: { name: 'Rewards' },
                    [RumbleModuleTab.WALLETS]: { name: 'Wallets' },
                }}
                activeTab={currentTab}
                onTabChange={onTabChange as (str: string) => void}
                {...props}
            />
        </Box>
    );
};
