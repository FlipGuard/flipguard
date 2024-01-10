import { Box, CardProps } from '@mui/material';

import { CustomTabsCard } from '../../../../components/molecules/tabs/CustomTabsCard';

export const ShopModuleTab = {
    APPEARANCE: 'APPEARANCE',
    ITEMS: 'ITEMS',
    WALLETS: 'WALLETS',
} as const;

export type ShopModuleTab = (typeof ShopModuleTab)[keyof typeof ShopModuleTab];

type Props = CardProps & {
    currentTab: ShopModuleTab;
    onTabChange: (tab: ShopModuleTab) => void;
};

export const FlipBotShopModuleTabsCard = ({ currentTab, onTabChange, ...props }: Props) => {
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
                    [ShopModuleTab.APPEARANCE]: { name: 'Appearance' },
                    [ShopModuleTab.ITEMS]: { name: 'Items' },
                    [ShopModuleTab.WALLETS]: { name: 'Wallets' },
                }}
                activeTab={currentTab}
                onTabChange={onTabChange as (str: string) => void}
                {...props}
            />
        </Box>
    );
};
