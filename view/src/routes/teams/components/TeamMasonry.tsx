import { TeamModel } from '@flipguard/webapp-api';
import React from 'react';

import { CustomMasonry } from '../../../components/molecules/masonry/CustomMasonry';
import { NoDataFallback } from '../../../components/molecules/utils/NoDataFallback';
import { TeamCard } from './TeamCard';

type Props = {
    teams: TeamModel[];
    loading: boolean;
};

export const TeamMasonry = ({ teams, loading }: Props) => {
    if (!loading && teams.length === 0) {
        return <NoDataFallback text={"You don't belong to any teams yet"} />;
    }

    return (
        <CustomMasonry
            columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
            spacing={3}
            sx={{ width: 'auto' }}
            loading={loading}
        >
            {teams.map((t) => (
                <TeamCard key={t.id} team={t} />
            ))}
        </CustomMasonry>
    );
};
