import {
    DISCORD_POOL_ITEM_MIN_CHANCE,
    DiscordItem,
    DiscordItemType,
    DiscordPoolItem,
    NftDiscordItem,
    WalletNftDto,
} from '@flipguard/webapp-api';

export const getDefaultDiscordItemForType = (type: DiscordItemType): DiscordItem => {
    switch (type) {
        case 'CUSTOM': {
            return {
                type: type,
                description: '',
            };
        }
        case 'ROLE': {
            return {
                type: type,
                roleId: '',
            };
        }
        case 'TOKEN': {
            return {
                type: type,
                symbol: 'MATIC',
                amount: 0,
            };
        }
        case 'NFT': {
            return {
                type: type,
                contract: '',
                tokenId: '',
                standard: 'ERC-721',
                name: '',
                amount: 1,
            };
        }
    }
};

export const getDefaultDiscordPoolItemForType = (type: DiscordItemType): DiscordPoolItem => {
    return {
        ...getDefaultDiscordItemForType(type),
        id: '',
        chance: DISCORD_POOL_ITEM_MIN_CHANCE,
        quantity: 1,
    };
};

export const isDiscordItemValid = (item: DiscordItem) => {
    switch (item.type) {
        case 'CUSTOM':
            return !!item.description;
        case 'ROLE':
            return !!item.roleId && !!item.roleId.match(/^\d+$/);
        case 'TOKEN':
            return item.amount > 0;
        case 'NFT':
            return item.contract && item.tokenId && (!item.amount || item.amount > 0);
        default:
            return false;
    }
};

export const isDiscordPoolItemValid = (item: DiscordPoolItem) => {
    if (item.chance < DISCORD_POOL_ITEM_MIN_CHANCE || 100 < item.chance) {
        return false;
    }

    if (item.quantity !== undefined && item.quantity <= 0) {
        return false;
    }

    return isDiscordItemValid(item);
};

export const walletNftDtoFromDiscordItem = (r: NftDiscordItem): WalletNftDto => ({
    tokenAddress: r.contract,
    tokenId: r.tokenId,
    standard: r.standard,
    name: r.name,
    amount: r.amount ?? 1,
});
