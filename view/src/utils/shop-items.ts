import { DiscordItemType, FlipBotShopItem } from '@flipguard/webapp-api';

export const getDefaultFlipBotShopItemForType = (type: DiscordItemType): FlipBotShopItem => {
    return {
        type: DiscordItemType.ROLE,
        name: '',
        description: '',
        priceSymbol: 'MATIC',
        priceAmount: 1,
        roleId: '',
        quantity: undefined,
        sendToBurnAddress: false,
    };
};

export const isFlipBotShopItemValid = (item: FlipBotShopItem) => {
    if (!item.name || !item.description) {
        return false;
    }

    if (item.quantity !== undefined && item.quantity <= 0) {
        return false;
    }

    if (item.type === DiscordItemType.ROLE) {
        return !!item.roleId && !!item.roleId.match(/^\d+$/) && (!item.duration || item.duration >= 0);
    }

    return false;
};
