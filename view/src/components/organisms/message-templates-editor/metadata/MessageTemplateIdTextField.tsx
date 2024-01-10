import { messageTemplateConstraints } from '@flipguard/webapp-api';
import { TextFieldProps } from '@mui/material';
import React from 'react';

import { CustomTextField } from '../../../atoms/inputs/text-field/CustomTextField';

type Props = TextFieldProps & {
    validationError?: string;
};

export const MessageTemplateIdTextField = ({ validationError, ...props }: Props) => {
    return (
        <CustomTextField
            name={'Message Template ID'}
            label={'Template Name'}
            inputProps={{ maxLength: messageTemplateConstraints.id.max }}
            error={validationError !== undefined && validationError !== ''}
            helperText={validationError}
            {...props}
        />
    );
};
