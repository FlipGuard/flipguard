import { NftEventType } from '@flipguard/domain';
import { MessageTemplateType } from '@flipguard/webapp-api';
import { TextFieldProps } from '@mui/material';
import React from 'react';

import { useAuth } from '../../../../hooks/use-auth';
import { CustomSelect } from '../../../atoms/inputs/select/CustomSelect';

type Props = TextFieldProps & {
    eventType: NftEventType;
    type: MessageTemplateType;
    value: string;
};

export const TrackerMessageTemplateSelect = ({ eventType, type, value, ...props }: Props) => {
    const { user } = useAuth();

    const availableTemplates = user.usedMessageTemplatesIds(type, eventType);

    const options =
        availableTemplates.length > 0
            ? availableTemplates.map((i) => ({ label: i, value: i }))
            : [{ label: 'None*', value: '' }];

    return (
        <CustomSelect
            name={'Message Template'}
            label={'Message Template'}
            value={availableTemplates.includes(value) ? value : ''}
            options={options}
            select
            required
            {...props}
        />
    );
};
