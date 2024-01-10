import { IntegrationType } from '@flipguard/webapp-api';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { getIntegrations, IntegrationQueryKeys } from '../../api/requests/integrations';
import { useAuth } from '../../hooks/use-auth';
import { IntegrationsTable } from './components/table/IntegrationsTable';
import { IntegrationsRouteHeader } from './IntegrationsRouteHeader';

export const IntegrationsRoute = () => {
    const { authenticated } = useAuth();

    const { isLoading, data: integrations } = useQuery(IntegrationQueryKeys.list(), getIntegrations, {
        enabled: authenticated,
    });

    const showProgress = authenticated && isLoading;
    const integrationsWithoutBurners = (integrations ?? []).filter((i) => i.type !== IntegrationType.BURNER_WALLET);

    return (
        <>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <IntegrationsRouteHeader />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <IntegrationsTable integrations={integrationsWithoutBurners} loading={showProgress} />
            </Grid>
        </>
    );
};
