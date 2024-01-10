import { NftEventType } from '@flipguard/domain';
import { BotGetDto } from '@flipguard/webapp-api';
import React from 'react';

import { RoutePath } from '../../../../config/constants/navigation';
import { CustomTable } from '../../../molecules/table/CustomTable';
import { NoDataFallback } from '../../../molecules/utils/NoDataFallback';
import { TrackersTableHeader } from './TrackersTableHeader';
import { TrackersTableRow } from './TrackersTableRow';
import { TrackersTableSkeletonRow } from './TrackersTableSkeletonRow';

type Props = {
    eventType: NftEventType;
    bots: BotGetDto[];
    loading: boolean;
    editRoute: RoutePath;
};

export const TrackersTable = ({ eventType, bots, loading, editRoute }: Props) => {
    if (!loading && bots.length === 0) {
        return <NoDataFallback text={`You have not created any ${eventType.toLowerCase()} trackers yet`} />;
    }

    return (
        <CustomTable header={TrackersTableHeader} skeletonRow={TrackersTableSkeletonRow} loading={loading}>
            {bots.map((bot) => (
                <TrackersTableRow key={bot.id} bot={bot} editRoute={editRoute} />
            ))}
        </CustomTable>
    );
};
