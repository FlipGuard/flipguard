import { OrderGetDto } from '@flipguard/webapp-api';
import React from 'react';

import { CustomTable } from '../../../../components/molecules/table/CustomTable';
import { NoDataFallback } from '../../../../components/molecules/utils/NoDataFallback';
import { OrdersTableHeader } from './OrdersTableHeader';
import { OrdersTableRow } from './OrdersTableRow';
import { OrdersTableSkeletonRow } from './OrdersTableSkeletonRow';

type Props = {
    orders: OrderGetDto[];
    loading: boolean;
    areOrdersCancellable: boolean;
};

export const OrdersTable = ({ orders, loading, areOrdersCancellable }: Props) => {
    if (!loading && orders.length === 0) {
        return <NoDataFallback text={'You have not ordered anything yet.'} />;
    }

    return (
        <CustomTable header={OrdersTableHeader} skeletonRow={OrdersTableSkeletonRow} loading={loading}>
            {orders.map((order) => (
                <OrdersTableRow key={order.id} order={order} cancelDisabled={!areOrdersCancellable} />
            ))}
        </CustomTable>
    );
};
