import { BurnerWalletIntegration } from '@flipguard/webapp-api';
import React from 'react';

import { CustomMasonry } from '../../../components/molecules/masonry/CustomMasonry';
import { NoDataFallback } from '../../../components/molecules/utils/NoDataFallback';
import { BurnerCard } from './BurnerCard';
import { BurnersMasonrySkeletonCard } from './BurnersMasonrySkeletonCard';

type Props = {
    burners: BurnerWalletIntegration[];
    loading: boolean;
};

export const BurnersMasonry = ({ burners, loading }: Props) => {
    if (!loading && burners.length === 0) {
        return <NoDataFallback text={'You have not added any wallets yet'} />;
    }

    return (
        <CustomMasonry
            columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}
            spacing={3}
            sx={{ width: 'auto' }}
            loading={loading}
            skeletonCard={BurnersMasonrySkeletonCard}
            skeletonCards={4}
        >
            {burners.map((burner) => (
                <BurnerCard key={burner.id} burner={burner} />
            ))}
        </CustomMasonry>
    );
};
