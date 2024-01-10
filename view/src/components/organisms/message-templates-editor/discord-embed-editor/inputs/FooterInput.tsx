import { discordEmbedTemplateConstraints } from '@flipguard/webapp-api';
import React from 'react';

import isViewMobile from '../../../../../hooks/utils/isViewMobile';
import { FadingTooltip } from '../../../../atoms/feedback/tooltip/FadingTooltip';
import { CustomTextField } from '../../../../atoms/inputs/text-field/CustomTextField';

type Props = {
    value: string;
    onChange: (value: string) => void;
    disabled: boolean;
    disabledMessage: string;
};

export const FooterInput = ({ value, onChange, disabled, disabledMessage }: Props) => {
    const isMobile = isViewMobile();

    return (
        <FadingTooltip title={disabled ? disabledMessage : ''} placement={isMobile ? 'bottom' : 'left'}>
            <span style={{ margin: '12px 8px' }}>
                <CustomTextField
                    name={'Embed Footer'}
                    label={'Footer'}
                    sx={{
                        width: '100%',
                    }}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    inputProps={{ maxLength: discordEmbedTemplateConstraints.footer.max }}
                    disabled={disabled}
                />
            </span>
        </FadingTooltip>
    );
};
