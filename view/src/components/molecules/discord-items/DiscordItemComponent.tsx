import { DiscordItem, DiscordItemType } from '@flipguard/webapp-api';
import { ReactNode } from 'react';

import { CustomDiscordItemComponent } from './components/CustomDiscordItemComponent';
import { NftDiscordItemComponent } from './components/NftDiscordItemComponent';
import { RoleDiscordItemComponent } from './components/RoleDiscordItemComponent';
import { TokenDiscordItemComponent } from './components/TokenDiscordItemComponent';

type Props = {
    item: DiscordItem;
    onDelete: () => void;
    children?: ReactNode;
};

export const DiscordItemComponent = ({ item, onDelete, children }: Props) => {
    if (item.type === DiscordItemType.CUSTOM) {
        return (
            <CustomDiscordItemComponent item={item} onDelete={onDelete}>
                {children}
            </CustomDiscordItemComponent>
        );
    }

    if (item.type === DiscordItemType.ROLE) {
        return (
            <RoleDiscordItemComponent item={item} onDelete={onDelete}>
                {children}
            </RoleDiscordItemComponent>
        );
    }

    if (item.type === DiscordItemType.TOKEN) {
        return (
            <TokenDiscordItemComponent item={item} onDelete={onDelete}>
                {children}
            </TokenDiscordItemComponent>
        );
    }

    if (item.type === DiscordItemType.NFT) {
        return (
            <NftDiscordItemComponent item={item} onDelete={onDelete}>
                {children}
            </NftDiscordItemComponent>
        );
    }

    return null;
};
