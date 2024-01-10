import { BotExtensionGetDto } from '@flipguard/webapp-api';
import React from 'react';

import { CustomTable } from '../../../components/molecules/table/CustomTable';
import { NoDataFallback } from '../../../components/molecules/utils/NoDataFallback';
import { ExtensionsTableHeader } from './ExtensionsTableHeader';
import { ExtensionsTableRow } from './ExtensionsTableRow';
import { ExtensionsTableSkeletonRow } from './ExtensionsTableSkeletonRow';

type Props = {
    extensions: BotExtensionGetDto[];
    loading: boolean;
};

export const ExtensionsTable = ({ extensions, loading }: Props) => {
    if (!loading && extensions.length === 0) {
        return <NoDataFallback text={'You have not created any extensions yet.'} />;
    }

    return (
        <CustomTable header={ExtensionsTableHeader} skeletonRow={ExtensionsTableSkeletonRow} loading={loading}>
            {extensions.map((extension) => (
                <ExtensionsTableRow key={extension.id} extension={extension} />
            ))}
        </CustomTable>
    );
};
