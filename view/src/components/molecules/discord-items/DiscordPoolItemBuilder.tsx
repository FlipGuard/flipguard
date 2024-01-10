import { DiscordItem, DiscordPoolItem } from '@flipguard/webapp-api';
import { Box } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

import { InfoAlert } from '../../atoms/feedback/alert/InfoAlert';
import { NumericInput } from '../../atoms/inputs/text-field/NumericInput';
import { DiscordItemBuilder } from './DiscordItemBuilder';

const QUANTITY_LEFT_DESCRIPTION = `
    Leave quantity left input blank if you don't want the item to be removed from the pool automatically
`;

type Props = {
    item: DiscordPoolItem;
    setItem: Dispatch<SetStateAction<DiscordPoolItem>>;
};

export const DiscordPoolItemBuilder = ({ item, setItem }: Props) => {
    return (
        <DiscordItemBuilder item={item} setItem={setItem as Dispatch<SetStateAction<DiscordItem>>}>
            <Box sx={{ margin: '8px', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <NumericInput
                    sx={{ flexGrow: 1 }}
                    type={'float'}
                    label={'Win Chance'}
                    value={item.chance}
                    onValueChange={(value) => setItem((prev) => ({ ...prev, chance: value }))}
                    InputProps={{ endAdornment: '%' }}
                />
                <NumericInput
                    sx={{ flexGrow: 1 }}
                    type={'integer'}
                    label={'Quantity left'}
                    value={item.quantity}
                    onValueChange={(value) => setItem((prev) => ({ ...prev, quantity: value }))}
                    onEmpty={() => setItem((prev) => ({ ...prev, quantity: undefined }))}
                />
            </Box>
            <InfoAlert sx={{ margin: '8px' }}>{QUANTITY_LEFT_DESCRIPTION}</InfoAlert>
        </DiscordItemBuilder>
    );
};
