import { discordEmbedTemplateConstraints } from '@flipguard/webapp-api';
import React from 'react';

import isViewMobile from '../../../../../hooks/utils/isViewMobile';
import { CustomTextField } from '../../../../atoms/inputs/text-field/CustomTextField';

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export const DescriptionInput = ({ value, onChange }: Props) => {
    const isMobile = isViewMobile();

    return (
        <CustomTextField
            name={'Embed Description'}
            label={'Description'}
            sx={{
                margin: '12px 8px',
                width: 'auto',
            }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            inputProps={{
                maxLength: discordEmbedTemplateConstraints.description.max,
            }}
            multiline
            rows={isMobile ? 6 : undefined}
        />
    );
};
