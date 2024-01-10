import {
    DiscordItemType,
    FlipBotShopItem,
    RoleFlipBotShopItem,
    SUPPORTED_FLIPBOT_TOKEN_SYMBOLS,
} from '@flipguard/webapp-api';
import { Box } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

import { InfoAlert } from '../../../../../../components/atoms/feedback/alert/InfoAlert';
import { CustomSelect } from '../../../../../../components/atoms/inputs/select/CustomSelect';
import { CustomSwitch } from '../../../../../../components/atoms/inputs/switch/CustomSwitch';
import { CustomTextField } from '../../../../../../components/atoms/inputs/text-field/CustomTextField';
import { NumericInput } from '../../../../../../components/atoms/inputs/text-field/NumericInput';
import { RoleShopItemBuilder } from './RoleShopItemBuilder';

const QUANTITY_LEFT_DESCRIPTION = `
    Leave quantity left input blank if you don't want the item to be removed from the shop automatically
`;

type Props = {
    type: DiscordItemType;
    setType: Dispatch<SetStateAction<DiscordItemType>>;
    item: FlipBotShopItem;
    setItem: Dispatch<SetStateAction<FlipBotShopItem>>;
    reservedNames?: string[];
    typeChangeDisabled?: boolean;
    nameChangeDisabled?: boolean;
};

export const ShopItemBuilder = ({
    type,
    setType,
    item,
    setItem,
    reservedNames = [],
    typeChangeDisabled,
    nameChangeDisabled,
}: Props) => {
    const builder = (() => {
        if (item.type === DiscordItemType.ROLE) {
            return (
                <RoleShopItemBuilder item={item} setItem={setItem as Dispatch<SetStateAction<RoleFlipBotShopItem>>} />
            );
        }
    })();

    const nameIsTaken = reservedNames.includes(item.name);

    return (
        <>
            <CustomTextField
                sx={{ margin: '8px' }}
                label={'Name'}
                value={item.name}
                onChange={(e) => setItem((prev) => ({ ...prev, name: e.target.value }))}
                inputProps={{ maxLength: 32 }}
                disabled={nameChangeDisabled}
                error={nameIsTaken}
                helperText={nameIsTaken ? 'This name is already taken' : ''}
            />
            <CustomTextField
                sx={{ margin: '8px' }}
                label={'Description'}
                value={item.description}
                onChange={(e) => setItem((prev) => ({ ...prev, description: e.target.value }))}
                inputProps={{ maxLength: 128 }}
            />
            <CustomSelect
                sx={{ margin: '8px' }}
                label={'Item type'}
                options={[{ label: 'Role', value: DiscordItemType.ROLE }]}
                value={type}
                onChange={(e) => setType(e.target.value as DiscordItemType)}
                select
                disabled={typeChangeDisabled}
            />
            {builder}
            <Box sx={{ margin: '8px', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <NumericInput
                    sx={{ flexGrow: 1 }}
                    type={'float'}
                    label={'Price'}
                    value={item.priceAmount}
                    onValueChange={(value) => setItem((prev) => ({ ...prev, priceAmount: value }))}
                />
                <CustomSelect
                    sx={{ width: '128px' }}
                    label={'Token'}
                    options={SUPPORTED_FLIPBOT_TOKEN_SYMBOLS.map((symbol) => ({ label: symbol, value: symbol }))}
                    value={item.priceSymbol}
                    onChange={(e) => setItem((prev) => ({ ...prev, priceSymbol: e.target.value }))}
                    select
                />
            </Box>
            <CustomSwitch
                sx={{ margin: '8px 0 8px 12px', justifyContent: 'space-between' }}
                label={'Burn tokens on purchase'}
                labelPlacement={'start'}
                checked={!!item.sendToBurnAddress}
                onChange={(v) => setItem((prev) => ({ ...prev, sendToBurnAddress: v }))}
            />
            <NumericInput
                sx={{ flexGrow: 1, margin: '8px' }}
                type={'integer'}
                label={'Quantity left'}
                value={item.quantity}
                onValueChange={(value) => setItem((prev) => ({ ...prev, quantity: value }))}
                onEmpty={() => setItem((prev) => ({ ...prev, quantity: undefined }))}
            />
            <InfoAlert sx={{ margin: '8px' }}>{QUANTITY_LEFT_DESCRIPTION}</InfoAlert>
        </>
    );
};
