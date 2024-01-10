import { BotGetDto } from '@flipguard/webapp-api';
import React from 'react';

import { CustomTable } from '../../../components/molecules/table/CustomTable';
import { NoDataFallback } from '../../../components/molecules/utils/NoDataFallback';
import { CustomBotsTableHeader } from './CustomBotsTableHeader';
import { CustomBotsTableRow } from './CustomBotsTableRow';
import { CustomBotsTableSkeletonRow } from './CustomBotsTableSkeletonRow';

type Props = {
    bots: BotGetDto[];
    loading: boolean;
};

export const CustomBotsTable = ({ bots, loading }: Props) => {
    if (!loading && bots.length === 0) {
        return <NoDataFallback text={`You have not created any custom bots yet`} />;
    }

    return (
        <CustomTable header={CustomBotsTableHeader} skeletonRow={CustomBotsTableSkeletonRow} loading={loading}>
            {bots.map((bot) => (
                <CustomBotsTableRow key={bot.id} bot={bot} />
            ))}
        </CustomTable>
    );
};
