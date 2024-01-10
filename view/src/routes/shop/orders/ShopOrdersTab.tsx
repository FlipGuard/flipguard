import { Box, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { getOrders, ORDERS_KEY } from '../../../api/requests/orders';
import { useAuth } from '../../../hooks/use-auth';
import { OrdersTable } from './table/OrdersTable';

type Props = {
    areOrdersCancellable: boolean;
};

export const ShopOrdersTab = ({ areOrdersCancellable }: Props) => {
    const { authenticated } = useAuth();

    const { isLoading, data: orders } = useQuery([ORDERS_KEY], getOrders, {
        enabled: authenticated,
    });

    const showProgress = authenticated && isLoading;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '4px 0' }}>
                    <Typography variant={'h6'} sx={{ fontSize: '24px' }}>
                        My orders
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
                <OrdersTable orders={orders ?? []} loading={showProgress} areOrdersCancellable={areOrdersCancellable} />
            </Grid>
        </Grid>
    );
};
