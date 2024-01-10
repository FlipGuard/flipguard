import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Redirect } from 'wouter';

import { getIntegration, IntegrationQueryKeys } from '../../api/requests/integrations';
import { RoutePath } from '../../config/constants/navigation';
import { IntegrationsEdit } from './IntegrationsEdit';

type Props = {
    integrationId: string;
};

export const IntegrationsEditRoute = ({ integrationId }: Props) => {
    const { isLoading, data: integration } = useQuery(IntegrationQueryKeys.detail(integrationId), () =>
        getIntegration(integrationId),
    );

    if (isLoading) {
        return null;
    }

    if (!integration) {
        return <Redirect to={RoutePath.Integrations} />;
    }

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <IntegrationsEdit integration={integration} />
        </Grid>
    );
};
