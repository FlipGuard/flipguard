import { TwitterRaid } from '@flipguard/webapp-api';
import React from 'react';

import { CustomTable } from '../../../../../../../../components/molecules/table/CustomTable';
import { NoDataFallback } from '../../../../../../../../components/molecules/utils/NoDataFallback';
import { RaidsTableHeader } from './RaidsTableHeader';
import { RaidsTableRow } from './RaidsTableRow';

const NO_DATA_MSG = 'You have not created any raids yet';

type Props = {
    configId: string;
    raids: TwitterRaid[];
};

export const RaidsTable = ({ configId, raids }: Props) => {
    if (raids.length === 0) {
        return <NoDataFallback text={NO_DATA_MSG} />;
    }

    return (
        <CustomTable header={RaidsTableHeader} loading={false}>
            {[...raids]
                .sort((a, b) => a.endTime - b.endTime)
                .map((raid) => (
                    <RaidsTableRow key={raid.id} raid={raid} configId={configId} />
                ))}
        </CustomTable>
    );
};
