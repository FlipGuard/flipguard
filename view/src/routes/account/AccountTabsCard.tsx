import { CardProps } from '@mui/material';

import { CustomTabsCard } from '../../components/molecules/tabs/CustomTabsCard';
import { RoutePath } from '../../config/constants/navigation';

export const AccountTabName = {
    GENERAL: 'general',
    CONNECTIONS: 'connections',
    REFERRALS: 'referrals',
    SETTINGS: 'settings',
} as const;

export type AccountTabName = (typeof AccountTabName)[keyof typeof AccountTabName];

type Props = CardProps & {
    activeTab: AccountTabName;
    onTabChange: (tab: AccountTabName) => void;
};

export const AccountTabsCard = ({ activeTab, onTabChange, ...props }: Props) => {
    return (
        <CustomTabsCard
            tabs={{
                [AccountTabName.GENERAL]: { name: 'General', path: RoutePath.Account },
                [AccountTabName.CONNECTIONS]: { name: 'Connections', path: RoutePath.AccountConnections },
                [AccountTabName.REFERRALS]: { name: 'Referrals', path: RoutePath.AccountReferrals },
                [AccountTabName.SETTINGS]: { name: 'Settings', path: RoutePath.AccountSettings },
            }}
            activeTab={activeTab}
            onTabChange={onTabChange as (str: string) => void}
            {...props}
        />
    );
};
