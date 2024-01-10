import { BiddingBotGetDto } from '@flipguard/webapp-api';
import React from 'react';

import { CustomTable } from '../../../components/molecules/table/CustomTable';
import { NoDataFallback } from '../../../components/molecules/utils/NoDataFallback';
import { BiddingBotsTableHeader } from './BiddingBotsTableHeader';
import { BiddingBotsTableRow } from './BiddingBotsTableRow';
import { BiddingBotsTableSkeletonRow } from './BiddingBotsTableSkeletonRow';

type Props = {
    bots: BiddingBotGetDto[];
    loading: boolean;
};

export const BiddingBotsTable = ({ bots, loading }: Props) => {
    if (!loading && bots.length === 0) {
        return <NoDataFallback text={`You have not created any bidding bots yet`} />;
    }

    return (
        <CustomTable header={BiddingBotsTableHeader} skeletonRow={BiddingBotsTableSkeletonRow} loading={loading}>
            {bots.map((bot) => (
                <BiddingBotsTableRow key={bot.id} bot={bot} />
            ))}
        </CustomTable>
    );
};
