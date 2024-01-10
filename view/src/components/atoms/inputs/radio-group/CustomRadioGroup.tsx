import { FormControlLabel, Radio, RadioGroup, RadioGroupProps, styled, TooltipProps } from '@mui/material';

import isViewMobile from '../../../../hooks/utils/isViewMobile';
import { FadingTooltip } from '../../feedback/tooltip/FadingTooltip';

const StyledRadio = styled(Radio)({
    paddingTop: '4px',
    paddingBottom: '4px',
    '&.Mui-checked': {
        color: '#fff',
    },
});

type RadioConfig = {
    label: string;
    value: string;
    disabled?: boolean;
    disabledReason?: string;
    hideWhenDisabled?: boolean;
    tooltipMessage?: string;
    tooltipPlacement?: TooltipProps['placement'];
};

type Props = Omit<RadioGroupProps, 'onChange'> & {
    radios: RadioConfig[];
    value: string;
    onChange: (value: string) => void;
};

export const CustomRadioGroup = ({ radios, value, onChange, ...radioGroupProps }: Props) => {
    const isMobile = isViewMobile('md');

    return (
        <RadioGroup {...radioGroupProps} value={value} onChange={(e) => onChange(e.target.value)}>
            {radios
                .filter((r) => !r.disabled || !r.hideWhenDisabled)
                .map(({ label, value: radioValue, disabled, disabledReason, tooltipMessage, tooltipPlacement }) => (
                    <FadingTooltip
                        key={radioValue}
                        title={disabled ? disabledReason : tooltipMessage}
                        placement={isMobile ? 'top' : tooltipPlacement ?? 'top'}
                    >
                        <FormControlLabel
                            sx={{ width: isMobile ? 'auto' : 'fit-content' }}
                            disabled={disabled}
                            value={radioValue}
                            control={<StyledRadio disableRipple />}
                            label={label}
                        />
                    </FadingTooltip>
                ))}
        </RadioGroup>
    );
};
