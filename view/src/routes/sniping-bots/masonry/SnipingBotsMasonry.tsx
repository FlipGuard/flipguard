import { BotGetDto } from '@flipguard/webapp-api';
import React from 'react';

import { CustomMasonry } from '../../../components/molecules/masonry/CustomMasonry';
import { NoDataFallback } from '../../../components/molecules/utils/NoDataFallback';
import { SnipingBotCard } from './SnipingBotCard';
import { SnipingBotMasonrySkeletonCard } from './SnipingBotMasonrySkeletonCard';

type Props = {
    bots: BotGetDto[];
    loading: boolean;
};

export const SnipingBotsMasonry = ({ bots, loading }: Props) => {
    if (!loading && bots.length === 0) {
        return <NoDataFallback text={'You have not created any sniping bots yet'} />;
    }

    return (
        <CustomMasonry
            columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}
            spacing={3}
            sx={{ width: 'auto' }}
            loading={loading}
            skeletonCard={SnipingBotMasonrySkeletonCard}
            skeletonCards={4}
        >
            {bots.map((bot) => (
                <SnipingBotCard key={bot.id} bot={bot} />
            ))}
        </CustomMasonry>
    );
};
