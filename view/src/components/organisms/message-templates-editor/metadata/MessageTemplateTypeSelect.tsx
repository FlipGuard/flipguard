import { MessageTemplateType } from '@flipguard/webapp-api';
import { TextFieldProps } from '@mui/material';
import React from 'react';

import { CustomSelect } from '../../../atoms/inputs/select/CustomSelect';

type Props = TextFieldProps;

export const MessageTemplateTypeSelect = (props: Props) => {
    return (
        <CustomSelect
            name={'Message Type'}
            label={'Message Type'}
            select
            options={[
                {
                    label: 'Discord embed',
                    value: MessageTemplateType.DISCORD_EMBED,
                },
                {
                    label: 'Tweet',
                    value: MessageTemplateType.TWITTER_TWEET,
                },
            ]}
            {...props}
        />
    );
};
