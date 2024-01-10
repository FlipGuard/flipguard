import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { getSnipeHistory, UserQueryKeys } from '../../../api/requests/user';
import { CustomTable } from '../../../components/molecules/table/CustomTable';
import { NoDataFallback } from '../../../components/molecules/utils/NoDataFallback';
import { useAuth } from '../../../hooks/use-auth';
import { SnipeTableHeader } from './table/SnipeTableHeader';
import { SnipeTableRow } from './table/SnipeTableRow';
import { SnipeTableSkeletonRow } from './table/SnipeTableSkeletonRow';

export const SnipesHistoryTab = () => {
    const { authenticated } = useAuth();
    const { data: snipes = [], isLoading } = useQuery(UserQueryKeys.mySnipes(), getSnipeHistory, {
        enabled: authenticated,
    });

    const sortedSnipes = snipes.sort((a, b) => b.meta.txTimestamp - a.meta.txTimestamp);

    if (!authenticated) {
        return <NoDataFallback text={'Sign in to have access to this view'} />;
    }

    if (!isLoading && sortedSnipes.length === 0) {
        return <NoDataFallback text={'You have not sniped anything yet'} />;
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <CustomTable header={SnipeTableHeader} loading={isLoading} skeletonRow={SnipeTableSkeletonRow}>
                    {sortedSnipes.map((s, idx) => (
                        <SnipeTableRow key={idx} snipe={s} />
                    ))}
                </CustomTable>
            </Grid>
        </Grid>
    );
};
