import { Integration } from '@flipguard/webapp-api';
import React from 'react';

import { CustomTable } from '../../../../components/molecules/table/CustomTable';
import { NoDataFallback } from '../../../../components/molecules/utils/NoDataFallback';
import { IntegrationsTableHeader } from './IntegrationsTableHeader';
import { IntegrationsTableRow } from './IntegrationsTableRow';
import { SkeletonRow } from './IntegrationsTableSkeletonRow';

type Props = {
    integrations: Integration[];
    loading: boolean;
};

export const IntegrationsTable = ({ integrations, loading }: Props) => {
    if (!loading && integrations.length === 0) {
        return <NoDataFallback text={'You have not added any integrations yet.'} />;
    }

    return (
        <CustomTable header={IntegrationsTableHeader} skeletonRow={SkeletonRow} loading={loading}>
            {integrations.map((integration) => (
                <IntegrationsTableRow key={integration.id} integration={integration} />
            ))}
        </CustomTable>
    );
};
