import { Box, CardProps } from '@mui/material';
import React from 'react';

import { CustomTabsCard } from '../../components/molecules/tabs/CustomTabsCard';
import { RoutePath } from '../../config/constants/navigation';
import isViewMobile from '../../hooks/utils/isViewMobile';
import { RedeemCodeButton } from './RedeemCodeButton';

export const ShopTabName = {
    TEAM: 'team',
    INDIVIDUAL: 'individual',
    ORDERS: 'orders',
} as const;

export type ShopTabName = (typeof ShopTabName)[keyof typeof ShopTabName];

type Props = CardProps & {
    currentTab: ShopTabName;
    onTabChange: (tab: ShopTabName) => void;
};

export const ShopTabsCard = ({ currentTab, onTabChange, ...props }: Props) => {
    const isMobile = isViewMobile('sm');

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
                    [ShopTabName.TEAM]: { name: 'Team', path: RoutePath.Shop },
                    [ShopTabName.INDIVIDUAL]: { name: 'Individual', path: RoutePath.ShopIndividual, withDivider: true },
                    [ShopTabName.ORDERS]: { name: 'My orders', path: RoutePath.ShopOrders },
                }}
                activeTab={currentTab}
                onTabChange={onTabChange as (str: string) => void}
                {...props}
            />
            <Box sx={{ marginTop: isMobile ? '12px' : 0 }}>
                <RedeemCodeButton />
            </Box>
        </Box>
    );
};
