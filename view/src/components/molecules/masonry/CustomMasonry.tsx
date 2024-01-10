import { Masonry, MasonryProps } from '@mui/lab';
import { styled } from '@mui/material';
import React, { ComponentType } from 'react';

import { useDelay } from '../../../hooks/use-delay';
import isViewMobile from '../../../hooks/utils/isViewMobile';

const StyledMasonry = styled(Masonry, {
    shouldForwardProp: (prop) => prop !== 'show',
})<MasonryProps & { show: boolean }>(({ show }) => ({
    visibility: show ? 'visible' : 'hidden',
}));

type Props = MasonryProps & {
    loading: boolean;
    skeletonCard?: ComponentType;
    skeletonCards?: number;
};

export const CustomMasonry = ({ loading, skeletonCard, skeletonCards, ...masonryProps }: Props) => {
    const isMobile = isViewMobile();
    const showMasonry = useDelay(250); // To avoid flickering
    const showSkeleton = useDelay(1000);

    const SkeletonCard = skeletonCard;
    const skeletonCardsNum = skeletonCards !== undefined ? skeletonCards : isMobile ? 3 : 6;

    if (loading && !showSkeleton) {
        return null;
    }

    return (
        <StyledMasonry show={showMasonry} {...masonryProps}>
            {loading && showSkeleton && SkeletonCard
                ? Array.from({ length: skeletonCardsNum }).map((_, idx) => <SkeletonCard key={idx} />)
                : masonryProps.children}
        </StyledMasonry>
    );
};
