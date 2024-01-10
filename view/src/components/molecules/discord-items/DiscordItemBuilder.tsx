import {
    CustomDiscordItem,
    DiscordItem,
    DiscordItemType,
    NftDiscordItem,
    RoleDiscordItem,
    TokenDiscordItem,
} from '@flipguard/webapp-api';
import { Dispatch, ReactNode, SetStateAction } from 'react';

import { CustomDiscordItemBuilder } from './builders/CustomDiscordItemBuilder';
import { NftDiscordItemBuilder } from './builders/NftDiscordItemBuilder';
import { RoleDiscordItemBuilder } from './builders/RoleDiscordItemBuilder';
import { TokenDiscordItemBuilder } from './builders/TokenDiscordItemBuilder';

type Props = {
    item: DiscordItem;
    setItem: Dispatch<SetStateAction<DiscordItem>>;
    children?: ReactNode;
};

export const DiscordItemBuilder = ({ item, setItem, children }: Props) => {
    if (item.type === DiscordItemType.CUSTOM) {
        return (
            <CustomDiscordItemBuilder item={item} setItem={setItem as Dispatch<SetStateAction<CustomDiscordItem>>}>
                {children}
            </CustomDiscordItemBuilder>
        );
    }

    if (item.type === DiscordItemType.ROLE) {
        return (
            <RoleDiscordItemBuilder item={item} setItem={setItem as Dispatch<SetStateAction<RoleDiscordItem>>}>
                {children}
            </RoleDiscordItemBuilder>
        );
    }

    if (item.type === DiscordItemType.TOKEN) {
        return (
            <TokenDiscordItemBuilder item={item} setItem={setItem as Dispatch<SetStateAction<TokenDiscordItem>>}>
                {children}
            </TokenDiscordItemBuilder>
        );
    }

    if (item.type === DiscordItemType.NFT) {
        return (
            <NftDiscordItemBuilder item={item} setItem={setItem as Dispatch<SetStateAction<NftDiscordItem>>}>
                {children}
            </NftDiscordItemBuilder>
        );
    }

    return null;
};
