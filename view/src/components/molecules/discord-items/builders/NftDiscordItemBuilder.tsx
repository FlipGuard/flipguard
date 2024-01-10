import { shorten } from '@flipguard/commons';
import { NftDiscordItem, WalletNftDto } from '@flipguard/webapp-api';
import { useQuery } from '@tanstack/react-query';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';

import { FlipBotRumbleModuleQueryKeys, getRewardsWalletNfts } from '../../../../api/requests/flipbot-modules-rumble';
import { useFlipBotContext } from '../../../../contexts/flipbot-context';
import { walletNftDtoFromDiscordItem } from '../../../../utils/discord-items';
import { CustomSelect } from '../../../atoms/inputs/select/CustomSelect';
import { NumericInput } from '../../../atoms/inputs/text-field/NumericInput';

type Props = {
    item: NftDiscordItem;
    setItem: Dispatch<SetStateAction<NftDiscordItem>>;
    children?: ReactNode;
};

export const NftDiscordItemBuilder = ({ item, setItem, children }: Props) => {
    const { scopedConfig } = useFlipBotContext();

    const guildConfigId = scopedConfig?.id ?? '';

    const { data: nfts = [] } = useQuery(
        FlipBotRumbleModuleQueryKeys.rewardsWalletNfts(guildConfigId),
        () => getRewardsWalletNfts(guildConfigId),
        {
            enabled: !!guildConfigId,
        },
    );

    return (
        <>
            <CustomSelect
                sx={{ margin: '8px' }}
                label={'NFT'}
                helperText={'NFTs held on the rewards wallet will be shown here.'}
                options={nfts.map((n, idx) => ({
                    label: `${idx + 1}. ${n.name} (#${shorten(n.tokenId)})`,
                    value: JSON.stringify(n),
                }))}
                value={JSON.stringify(walletNftDtoFromDiscordItem(item))}
                onChange={(e) => {
                    const nft = JSON.parse(e.target.value) as WalletNftDto;
                    setItem((prev) => ({
                        ...prev,
                        contract: nft.tokenAddress,
                        tokenId: nft.tokenId,
                        standard: nft.standard,
                        name: nft.name,
                    }));
                }}
                select
            />
            <NumericInput
                sx={{ margin: '8px' }}
                type={'integer'}
                label={'Amount'}
                helperText={'Applicable only to ERC-1155 tokens'}
                value={item.amount}
                onValueChange={(value) => setItem((prev) => ({ ...prev, amount: value }))}
            />
            {children}
        </>
    );
};
