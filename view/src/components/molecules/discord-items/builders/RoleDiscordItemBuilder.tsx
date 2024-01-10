import { RoleDiscordItem } from '@flipguard/webapp-api';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';

import { WarningAlert } from '../../../atoms/feedback/alert/WarningAlert';
import { CustomTextField } from '../../../atoms/inputs/text-field/CustomTextField';

const ROLE_DESCRIPTION = `
    In Discord, go to Server Settings > Roles and make sure the FlipSuite role is above the role you've selected or 
    it will not be automatically granted
`;

type Props = {
    item: RoleDiscordItem;
    setItem: Dispatch<SetStateAction<RoleDiscordItem>>;
    children?: ReactNode;
};

export const RoleDiscordItemBuilder = ({ item, setItem, children }: Props) => {
    return (
        <>
            <CustomTextField
                sx={{ margin: '8px' }}
                label={'Role ID'}
                value={item.roleId}
                onChange={(e) => setItem((prev) => ({ ...prev, roleId: e.target.value }))}
                inputProps={{ maxLength: 128 }}
            />
            <WarningAlert sx={{ margin: '8px' }}>{ROLE_DESCRIPTION}</WarningAlert>
            {children}
        </>
    );
};
