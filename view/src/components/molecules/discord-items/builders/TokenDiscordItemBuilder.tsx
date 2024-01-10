import { SUPPORTED_FLIPBOT_TOKEN_SYMBOLS, TokenDiscordItem } from '@flipguard/webapp-api';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';

import { CustomSelect } from '../../../atoms/inputs/select/CustomSelect';
import { NumericInput } from '../../../atoms/inputs/text-field/NumericInput';

type Props = {
    item: TokenDiscordItem;
    setItem: Dispatch<SetStateAction<TokenDiscordItem>>;
    children?: ReactNode;
};

export const TokenDiscordItemBuilder = ({ item, setItem, children }: Props) => {
    return (
        <>
            <CustomSelect
                sx={{ margin: '8px' }}
                label={'Token'}
                options={SUPPORTED_FLIPBOT_TOKEN_SYMBOLS.map((symbol) => ({ label: symbol, value: symbol }))}
                value={item.symbol}
                onChange={(e) => setItem((prev) => ({ ...prev, symbol: e.target.value }))}
                select
            />
            <NumericInput
                sx={{ margin: '8px' }}
                type={'float'}
                label={'Amount'}
                value={item.amount}
                onValueChange={(value) => setItem((prev) => ({ ...prev, amount: value }))}
            />
            {children}
        </>
    );
};
