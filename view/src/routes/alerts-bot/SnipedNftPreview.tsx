import { Marketplaces } from '@flipguard/domain';
import React from 'react';

import FlipBotLogo from '../../assets/flipbot-logo.png';
import { DiscordEmbed } from '../../components/molecules/discord/DiscordEmbed';

type Props = {
    image: string;
    name: string;
    collection: string;
    price: string;
    transaction: string;
};

export const SnipedNftPreview = ({ image, name, collection, price, transaction }: Props) => {
    const tx = transaction.substring(0, 6) + '...' + transaction.substring(transaction.length - 6);

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
            leftBorderColor={'#4ce25e'}
            title={'Snipe successful!'}
            thumbnailUrl={image}
            description={[
                `**Name:** ${name}`,
                `**Collection:** ${collection}`,
                `**Price:** ${price}`,
                `**Transaction:** [${tx}](https://polygonscan.com/tx/${transaction})`,
            ].join('\n')}
            fields={[]}
            footer={'Powered by flipguard.xyz'}
            footerImageUrl={FlipBotLogo}
            hideTimestamp={true}
        />
    );
};
