import { CardProps } from '@mui/material';

import { CustomTabsCard } from '../../../components/molecules/tabs/CustomTabsCard';

type Props = CardProps & {
    winnerGroups: string[];
    activeGroup: string;
    onGroupChange: (group: string) => void;
};

export const WinnerGroups = ({ winnerGroups, activeGroup, onGroupChange, ...props }: Props) => {
    return (
        <CustomTabsCard
            tabs={Object.fromEntries(winnerGroups.map((name) => [name, { name: name }]))}
            activeTab={activeGroup}
            onTabChange={onGroupChange}
            {...props}
        />
    );
};
