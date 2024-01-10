import { TextFieldProps } from '@mui/material';
import React, { useState } from 'react';

import { CustomTextField } from './CustomTextField';

type InputType = 'integer' | 'float';

const PATTERNS_FOR_TYPE = {
    integer: {
        validity: /^[0-9]+$/,
        pattern: '[0-9]*',
    },
    float: {
        validity: /^[0-9]+\.$/,
        pattern: '[0-9]*(\\.[0-9]+)?',
    },
};

type Props = TextFieldProps & {
    value?: number;
    minValue?: number;
    maxValue?: number;
    onValueChange?: (value: number) => void;
    onEmpty?: () => void;
    type: InputType;
};

export const NumericInput = ({ value, minValue, maxValue, onValueChange, onEmpty, type, ...props }: Props) => {
    const [amount, setAmount] = useState<string>('' + (value ?? ''));
    const [belowMin, setBelowMin] = useState(value !== undefined && minValue !== undefined ? value < minValue : false);
    const [exceedsMax, setExceedsMax] = useState(
        value !== undefined && maxValue !== undefined ? value > maxValue : false,
    );

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const rawValue = e.target.value;
        if (rawValue === '') {
            setAmount(rawValue);
            onEmpty && onEmpty();
        } else {
            const isValid = !e.target.validity.patternMismatch || rawValue.match(PATTERNS_FOR_TYPE[type].validity);
            if (isValid) {
                setAmount(rawValue);
                const value = Number(rawValue);
                if (!isNaN(value)) {
                    setExceedsMax(maxValue !== undefined && value > maxValue);
                    setBelowMin(minValue !== undefined && value < minValue);
                    onValueChange && onValueChange(value);
                }
            }
        }
    };

    return (
        <CustomTextField
            value={amount}
            onChange={handleValueChange}
            inputProps={{ inputMode: 'numeric', pattern: PATTERNS_FOR_TYPE[type].pattern, maxLength: 16 }}
            {...props}
            error={exceedsMax || belowMin}
            helperText={
                exceedsMax
                    ? `Value cannot be greater than ${maxValue}`
                    : belowMin
                    ? `Value cannot be less than ${minValue}`
                    : ''
            }
        />
    );
};
