import React from 'react';

import Brozo from '../../assets/brozo7950.png';
import { RarityEmbedPreview, RarityLevel } from './RarityEmbedPreview';

export const RarityEmbeds = () => {
    return (
        <RarityEmbedPreview
            collectionName={'BROZO'}
            collectionAddress={'0x220fa5ccc9404802ed6db0935eb4feefc27c937e'}
            tokenId={'7950'}
            tokenName={'BROZO #7950'}
            supply={8008}
            imageUrl={Brozo}
            rank={172}
            top={2.15}
            level={RarityLevel.Legendary}
        />
    );
};
