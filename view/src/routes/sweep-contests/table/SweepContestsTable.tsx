import { SweepContestGetDto } from '@flipguard/webapp-api';
import React from 'react';

import { CustomTable } from '../../../components/molecules/table/CustomTable';
import { NoDataFallback } from '../../../components/molecules/utils/NoDataFallback';
import { useTeamContext } from '../../../contexts/team-context';
import { SweepContestsTableHeader } from './SweepContestsTableHeader';
import { SweepContestsTableRow } from './SweepContestsTableRow';
import { SweepContestsTableSkeletonRow } from './SweepContestsTableSkeletonRow';

const NO_DATA_MSG = 'You have not created any sweep contests yet';
const NO_DATA_TEAM_MSG = `
    You have not created any sweep contests in this team yet. Either create one or move one of your own here.
`;

type Props = {
    sweepContests: SweepContestGetDto[];
    loading: boolean;
};

export const SweepContestsTable = ({ sweepContests, loading }: Props) => {
    const { scopedTeam } = useTeamContext();

    const scopedSweepContests = scopedTeam ? sweepContests.filter((sc) => sc.teamId === scopedTeam.id) : sweepContests;

    if (!loading && scopedSweepContests.length === 0) {
        return <NoDataFallback text={scopedTeam ? NO_DATA_TEAM_MSG : NO_DATA_MSG} />;
    }

    return (
        <CustomTable header={SweepContestsTableHeader} skeletonRow={SweepContestsTableSkeletonRow} loading={loading}>
            {scopedSweepContests.map((sc) => (
                <SweepContestsTableRow key={sc.id} sweepContest={sc} />
            ))}
        </CustomTable>
    );
};
