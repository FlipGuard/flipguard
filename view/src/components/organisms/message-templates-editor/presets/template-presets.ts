import { NftEventType } from '@flipguard/domain';
import {
    DiscordEmbedTemplate,
    MessageTemplateType,
    PossibleMessageTemplateValues,
    TweetTemplate,
} from '@flipguard/webapp-api';

const discordListingPreset: DiscordEmbedTemplate = {
    color: 'Marketplace',
    title: '{nft_name}',
    url: '{nft_url}',
    description: [
        '**Price:** {price} {price_token}',
        '**Value:** ${price_usd}',
        '**Seller:** [{seller_address_short}]({seller_url})',
    ].join('\n'),
    fields: [
        {
            name: 'Links',
            value: ['🔗 [NFT]({nft_url})'].join('\n'),
            inline: true,
        },
        {
            name: 'Collection',
            value: '🗃️ {collection_name}',
            inline: true,
        },
        {
            name: 'Token ID',
            value: '📋 {nft_id}',
            inline: true,
        },
        {
            name: 'Traits',
            value: '{nft_traits}',
            inline: false,
        },
    ],
    footer: 'Powered by flipguard.xyz',
    includeMedia: true,
};

const tweetListingPreset: TweetTemplate = {
    description: [
        '{nft_name} has been listed!',
        '💼 Marketplace: {marketplace_name}',
        '🏷️ Price: {price} ${price_token}',
        '💵 Value: ${price_usd}',
    ].join('\n'),
    includeMedia: true,
};

const discordSalePreset: DiscordEmbedTemplate = {
    color: 'Marketplace',
    title: '{nft_name}',
    url: '{nft_url}',
    description: [
        '**Price:** {price} {price_token}',
        '**Value:** ${price_usd}',
        '**Seller:** [{seller_address_short}]({seller_url})',
        '**Buyer:** [{buyer_address_short}]({buyer_url})',
    ].join('\n'),
    fields: [
        {
            name: 'Links',
            value: ['🔗 [NFT]({nft_url})', '🔗 [TX]({tx_url})'].join('\n'),
            inline: true,
        },
        {
            name: 'Collection',
            value: '🗃️ {collection_name}',
            inline: true,
        },
        {
            name: 'Token ID',
            value: '📋 {nft_id}',
            inline: true,
        },
        {
            name: 'Traits',
            value: '{nft_traits}',
            inline: false,
        },
    ],
    footer: 'Powered by flipguard.xyz',
    includeMedia: true,
};

const tweetSalePreset: TweetTemplate = {
    description: [
        '{nft_name} has been sold!',
        '💼 Marketplace: {marketplace_name}',
        '🏷️ Price: {price} ${price_token}',
        '💵 Value: ${price_usd}',
    ].join('\n'),
    includeMedia: true,
};

export const getPresetFor = (
    eventType: NftEventType,
    templateType: MessageTemplateType,
): PossibleMessageTemplateValues => {
    switch (eventType) {
        case NftEventType.Listing:
            return templateType === MessageTemplateType.DISCORD_EMBED ? discordListingPreset : tweetListingPreset;
        case NftEventType.Sale:
            return templateType === MessageTemplateType.DISCORD_EMBED ? discordSalePreset : tweetSalePreset;
        case NftEventType.AutobuySale:
            return templateType === MessageTemplateType.DISCORD_EMBED ? discordSalePreset : tweetSalePreset;
    }
};
