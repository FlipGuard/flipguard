import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { EXTENSIONS_KEY, getExtensions } from '../../api/requests/extensions';
import { useAuth } from '../../hooks/use-auth';
import { ExtensionsRouteHeader } from './ExtensionsRouteHeader';
import { ExtensionsTable } from './table/ExtensionsTable';

export const ExtensionsRoute = () => {
    const { authenticated } = useAuth();

    const { isLoading, data: extensions } = useQuery([EXTENSIONS_KEY], getExtensions, {
        enabled: authenticated,
    });

    const showProgress = authenticated && isLoading;

    return (
        <>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <ExtensionsRouteHeader />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <ExtensionsTable extensions={extensions ?? []} loading={showProgress} />
            </Grid>
        </>
    );
};
