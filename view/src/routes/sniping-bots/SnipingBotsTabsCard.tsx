import { Box, CardProps } from '@mui/material';
import React from 'react';
import { useLocation } from 'wouter';

import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { CustomTabsCard } from '../../components/molecules/tabs/CustomTabsCard';
import { RoutePath } from '../../config/constants/navigation';
import isViewMobile from '../../hooks/utils/isViewMobile';

export const SnipingBotsTabName = {
    BOTS: 'bots',
    USER_HISTORY: 'user_history',
} as const;

export type SnipingBotsTabName = (typeof SnipingBotsTabName)[keyof typeof SnipingBotsTabName];

type Props = CardProps & {
    currentTab: SnipingBotsTabName;
    onTabChange: (tab: SnipingBotsTabName) => void;
};

export const SnipingBotsTabsCard = ({ currentTab, onTabChange, ...props }: Props) => {
    const [, setLocation] = useLocation();
    const isMobile = isViewMobile(412);

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: isMobile ? '0' : '13px',
            }}
        >
            <CustomTabsCard
                tabs={{
                    [SnipingBotsTabName.BOTS]: { name: 'Dashboard', path: RoutePath.SnipingBots },
                    [SnipingBotsTabName.USER_HISTORY]: { name: 'My snipes', path: RoutePath.SnipingBotsMySnipes },
                }}
                activeTab={currentTab}
                onTabChange={onTabChange as (str: string) => void}
                {...props}
            />
            <Box sx={{ marginTop: isMobile ? '12px' : 0, marginLeft: isMobile ? 'auto' : 0 }}>
                <PrimaryButton onClick={() => setLocation(RoutePath.SnipingBotsCreate)}>
                    Create Sniping Bot
                </PrimaryButton>
            </Box>
        </Box>
    );
};
