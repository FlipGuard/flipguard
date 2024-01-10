import { MessageTemplate } from '@flipguard/webapp-api';
import React from 'react';

import { CustomMasonry } from '../../../components/molecules/masonry/CustomMasonry';
import { NoDataFallback } from '../../../components/molecules/utils/NoDataFallback';
import { MessageTemplateCard } from './MessageTemplateCard';
import { MessageTemplatesMasonrySkeletonCard } from './MessageTemplatesMasonrySkeletonCard';

type Props = {
    templates: MessageTemplate[];
    loading: boolean;
};

export const MessageTemplatesMasonry = ({ templates, loading }: Props) => {
    if (!loading && templates.length === 0) {
        return <NoDataFallback text={'You have not created any message templates yet.'} />;
    }

    return (
        <CustomMasonry
            columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}
            spacing={3}
            sx={{ width: 'auto' }}
            loading={loading}
            skeletonCard={MessageTemplatesMasonrySkeletonCard}
            skeletonCards={3}
        >
            {templates.map((template) => (
                <MessageTemplateCard key={template.id} template={template} />
            ))}
        </CustomMasonry>
    );
};
