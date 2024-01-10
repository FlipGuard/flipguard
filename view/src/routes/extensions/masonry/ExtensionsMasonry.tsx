import { BotExtensionGetDto } from '@flipguard/webapp-api';
import React from 'react';

import { CustomMasonry } from '../../../components/molecules/masonry/CustomMasonry';
import { NoDataFallback } from '../../../components/molecules/utils/NoDataFallback';
import { ExtensionCard } from './ExtensionCard';
import { ExtensionsMasonrySkeletonCard } from './ExtensionsMasonrySkeletonCard';

type Props = {
    extensions: BotExtensionGetDto[];
    loading: boolean;
};

export const ExtensionsMasonry = ({ extensions, loading }: Props) => {
    if (!loading && extensions.length === 0) {
        return <NoDataFallback text={'You have not created any extensions yet.'} />;
    }

    return (
        <CustomMasonry
            columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}
            spacing={3}
            sx={{ width: 'auto' }}
            loading={loading}
            skeletonCard={ExtensionsMasonrySkeletonCard}
        >
            {extensions.map((extension) => (
                <ExtensionCard key={extension.id} extension={extension} />
            ))}
        </CustomMasonry>
    );
};
