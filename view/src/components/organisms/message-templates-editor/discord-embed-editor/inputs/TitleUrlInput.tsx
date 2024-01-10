import { discordEmbedTemplateConstraints } from '@flipguard/webapp-api';
import React from 'react';

import { CustomTextField } from '../../../../atoms/inputs/text-field/CustomTextField';

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export const TitleUrlInput = ({ value, onChange }: Props) => {
    return (
        <CustomTextField
            name={'Embed URL'}
            label={'URL'}
            sx={{
                margin: '12px 8px',
                width: 'auto',
            }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            inputProps={{ maxLength: discordEmbedTemplateConstraints.url.max }}
        />
    );
};
