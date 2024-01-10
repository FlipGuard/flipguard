import { Marketplaces } from '@flipguard/domain';
import React from 'react';

import FlipBotLogo from '../../assets/flipbot-logo.png';
import { DiscordEmbed } from '../../components/molecules/discord/DiscordEmbed';

type Props = {
    image: string;
    name: string;
    collection: string;
    price: string;
    value: string;
};

export const SoldNftPreview = ({ image, name, collection, price, value }: Props) => {
    return (
        <DiscordEmbed
            sx={{
                '& .discord-embed-title': {
                    gridColumn: '1/1 !important',
                    marginTop: '10px',
                },
                '& .discord-embed-description': {
                    gridColumn: '1/1 !important',
                },
            }}
            authorName={'OpenSea'}
            authorImageUrl={Marketplaces.OPEN_SEA_POLYGON.iconUrl}
            leftBorderColor={'#58b9ff'}
            title={'Your NFT has been sold!'}
            thumbnailUrl={image}
            description={[
                `**Name:** ${name}`,
                `**Collection:** ${collection}`,
                `**Price:** ${price}`,
                `**Value:** ${value}`,
            ].join('\n')}
            fields={[]}
            footer={'Powered by flipguard.xyz'}
            footerImageUrl={FlipBotLogo}
            hideTimestamp={true}
        />
    );
};
