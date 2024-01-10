import { CustomDiscordItem } from '@flipguard/webapp-api';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';

import { CustomTextField } from '../../../atoms/inputs/text-field/CustomTextField';

type Props = {
    item: CustomDiscordItem;
    setItem: Dispatch<SetStateAction<CustomDiscordItem>>;
    children?: ReactNode;
};

export const CustomDiscordItemBuilder = ({ item, setItem, children }: Props) => {
    return (
        <>
            <CustomTextField
                sx={{ margin: '8px' }}
                label={'Description'}
                value={item.description}
                onChange={(e) => setItem((prev) => ({ ...prev, description: e.target.value }))}
                inputProps={{ maxLength: 128 }}
            />
            {children}
        </>
    );
};
