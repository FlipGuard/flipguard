import { NftEventType } from '@flipguard/domain';
import { Permission } from '@flipguard/webapp-api';
import { TextFieldProps } from '@mui/material';
import React from 'react';

import { useAuth } from '../../../../hooks/use-auth';
import { CustomSelect } from '../../../atoms/inputs/select/CustomSelect';

type Props = TextFieldProps;

export const MessageTemplateEventTypeSelect = (props: Props) => {
    const { user } = useAuth();

    const options = [
        {
            label: 'Listing',
            value: NftEventType.Listing,
        },
        {
            label: 'Sale',
            value: NftEventType.Sale,
        },
    ];

    if (user.hasPermission(Permission.ADMIN)) {
        options.push({
            label: 'Sale/Sniped',
            value: NftEventType.AutobuySale,
        });
    }

    return <CustomSelect name={'Event Type'} label={'Event Type'} select options={options} {...props} />;
};
