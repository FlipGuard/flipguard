import { Payout } from '@flipguard/webapp-api';
import React from 'react';

import { CustomTable } from '../../../../components/molecules/table/CustomTable';
import { NoDataFallback } from '../../../../components/molecules/utils/NoDataFallback';
import { PayoutsTableHeader } from './PayoutsTableHeader';
import { PayoutsTableRow } from './PayoutsTableRow';
import { PayoutsTableSkeletonRow } from './PayoutsTableSkeletonRow';

type Props = {
    payouts: Payout[];
    loading: boolean;
};

export const PayoutsTable = ({ payouts, loading }: Props) => {
    if (!loading && payouts.length === 0) {
        return <NoDataFallback text={'You have not received any payout yet.'} />;
    }

    return (
        <CustomTable header={PayoutsTableHeader} skeletonRow={PayoutsTableSkeletonRow} loading={loading}>
            {payouts.map((payout) => (
                <PayoutsTableRow key={payout.id} payout={payout} />
            ))}
        </CustomTable>
    );
};
