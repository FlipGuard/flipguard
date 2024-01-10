import { BurnerWalletIntegration, IntegrationType } from '@flipguard/webapp-api';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Redirect } from 'wouter';

import { getIntegration, IntegrationQueryKeys } from '../../api/requests/integrations';
import { RoutePath } from '../../config/constants/navigation';
import { BurnersEdit } from './BurnersEdit';

type Props = {
    burnerId: string;
};

export const BurnersEditRoute = ({ burnerId }: Props) => {
    const { isLoading, data: integration } = useQuery(IntegrationQueryKeys.detail(burnerId), () =>
        getIntegration(burnerId),
    );

    if (isLoading) {
        return null;
    }

    if (!integration || integration.type !== IntegrationType.BURNER_WALLET) {
        return <Redirect to={RoutePath.Burners} />;
    }

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <BurnersEdit burner={integration as BurnerWalletIntegration} />
        </Grid>
    );
};
