import { BurnerWalletIntegration, IntegrationType } from '@flipguard/webapp-api';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { getIntegrations, IntegrationQueryKeys } from '../../api/requests/integrations';
import { useAuth } from '../../hooks/use-auth';
import { BurnersRouteHeader } from './BurnersRouteHeader';
import { BurnersMasonry } from './masonry/BurnersMasonry';

export const BurnersRoute = () => {
    const { authenticated } = useAuth();

    const { isLoading, data: integrations = [] } = useQuery(IntegrationQueryKeys.list(), getIntegrations, {
        enabled: authenticated,
    });

    const showProgress = authenticated && isLoading;
    const burners: BurnerWalletIntegration[] = integrations.filter(
        (i): i is BurnerWalletIntegration => i.type === IntegrationType.BURNER_WALLET,
    );

    return (
        <>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <BurnersRouteHeader />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <BurnersMasonry burners={burners} loading={showProgress} />
            </Grid>
        </>
    );
};
