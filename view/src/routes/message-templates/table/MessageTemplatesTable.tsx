import { MessageTemplate } from '@flipguard/webapp-api';
import React from 'react';

import { CustomTable } from '../../../components/molecules/table/CustomTable';
import { NoDataFallback } from '../../../components/molecules/utils/NoDataFallback';
import { MessageTemplatesTableHeader } from './MessageTemplatesTableHeader';
import { MessageTemplatesTableRow } from './MessageTemplatesTableRow';
import { MessageTemplatesTableSkeletonRow } from './MessageTemplatesTableSkeletonRow';

type Props = {
    templates: MessageTemplate[];
    loading: boolean;
};

export const MessageTemplatesTable = ({ templates, loading }: Props) => {
    if (!loading && templates.length === 0) {
        return <NoDataFallback text={'You have not created any message templates yet.'} />;
    }

    return (
        <CustomTable
            header={MessageTemplatesTableHeader}
            skeletonRow={MessageTemplatesTableSkeletonRow}
            loading={loading}
        >
            {templates.map((templates) => (
                <MessageTemplatesTableRow key={templates.id} template={templates} />
            ))}
        </CustomTable>
    );
};
