import { MarketplaceKey } from '@flipguard/domain';
import { DynamicVariableTemplateName, VariableTemplateName } from '@flipguard/webapp-api';

import Drill from '../../../../assets/drill6420.png';

export type ExampleNft = {
    imageUrl: string;
    marketplace: MarketplaceKey;
    variables: Record<string, string>;
};

export const getRandomNftExample = (): ExampleNft => {
    return examples[Math.floor(Math.random() * examples.length)];
};

const traitList = (traits: Record<string, string>): string => {
    return Object.entries(traits)
        .map(([name, value]) => `• **${name}:** ${value}`)
        .join('\n');
};

const traitValues: Record<string, string> = {
    Background: 'Ethereal Mist',
    Clothes: 'None',
    Eyes: 'Midas Touch',
    Headwear: 'None',
    Mouth: 'Happy',
    Skin: 'Liquid',
};

const traitRarities: Record<string, string> = {
    Background: '13',
    Clothes: '17',
    Eyes: '0.68',
    Headwear: '50',
    Mouth: '24',
    Skin: '0.55',
};

const VARIABLES: Record<VariableTemplateName, string> = {
    buyer_address: '0x067cea2bf2eef1857dbe90da02610a509254dffd',
    buyer_address_short: '0x06...dffd',
    buyer_discord_id: '123456789',
    buyer_url: 'https://polygonscan.com/address/0x067cea2bf2eef1857dbe90da02610a509254dffd',
    collection_name: 'Drill Club',
    collection_address: '0x39cd103414106b922eb09c7d45df89608b59e887',
    marketplace_name: 'OpenSea',
    marketplace_chain: 'Polygon',
    nft_id: '6420',
    nft_id_short: '6420',
    nft_name: 'Drill Club #6420',
    nft_rank: '517',
    nft_rank_top: '7.42',
    nft_traits: traitList(
        Object.fromEntries(
            Object.keys(traitValues).map((key) => [key, `${traitValues[key]} (${traitRarities[key]}%)`]),
        ),
    ),
    nft_traits_no_rarity: traitList(traitValues),
    nft_url: 'https://opensea.io/assets/matic/0x39cd103414106b922eb09c7d45df89608b59e887/6420',
    price: '300',
    price_token: 'MATIC',
    price_usd: '160',
    seller_address: '0xcce1de2d71256f950d64b95eb1a4d95a09dd8190',
    seller_address_short: '0xcc...8190',
    seller_url: 'https://polygonscan.com/address/0xcce1de2d71256f950d64b95eb1a4d95a09dd8190',
    timestamp_ms: '1681855200000',
    timestamp_s: '1681855200',
    token_standard: 'ERC-721',
    tx_url: 'https://polygonscan.com/tx/0xb73cbdc6b30362c122863994f53f949ac2ada1bcec8c52e344ddc624964bffce',
    tx_hash: '0xb73cbdc6b30362c122863994f53f949ac2ada1bcec8c52e344ddc624964bffce',
    quantity: '1',
};

const DYNAMIC_VARIABLES: Record<DynamicVariableTemplateName, (key: string) => string> = {
    nft_trait: (key) => traitValues[key] ?? '',
    nft_trait_rarity: (key) => traitRarities[key] ?? '',
    marketplace_ctx: () => '',
};

const examples: ExampleNft[] = [
    {
        imageUrl: Drill,
        marketplace: 'OPEN_SEA_POLYGON',
        variables: {
            ...VARIABLES,
            ...Object.fromEntries(
                Object.keys(traitValues)
                    .map((key) => {
                        return Object.keys(DYNAMIC_VARIABLES).map((dynamic) => [
                            `${dynamic}[${key}]`,
                            DYNAMIC_VARIABLES[dynamic as DynamicVariableTemplateName](key),
                        ]);
                    })
                    .flatMap((entry) => entry),
            ),
        },
    },
];
