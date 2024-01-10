import { InputAdornment, TextFieldProps } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

import { CustomTextField } from './CustomTextField';

type Props = TextFieldProps & {
    value: number | '';
    setValue?: Dispatch<SetStateAction<number>>;
    onValueChange?: (value: number) => void;
    minValue: number;
    maxValue: number;
    adornment?: string;
};

export const CustomNumericTextField = ({
    value,
    setValue,
    onValueChange,
    minValue,
    maxValue,
    adornment,
    ...props
}: Props) => {
    return (
        <CustomTextField
            type={'number'}
            value={value}
            onChange={(e) => {
                const newValueStr = e.target.value;
                const isInvalid = newValueStr === '' || newValueStr.startsWith('-');
                if (setValue) {
                    setValue((prev) => {
                        if (isInvalid) {
                            return prev;
                        }
                        const newValue = parseFloat(newValueStr);
                        return minValue > newValue || newValue > maxValue ? prev : newValue;
                    });
                } else if (onValueChange && !isInvalid) {
                    const newValue = parseFloat(newValueStr);
                    if (minValue <= newValue && newValue <= maxValue) {
                        onValueChange(newValue);
                    }
                }
            }}
            InputProps={{
                endAdornment: adornment ? <InputAdornment position={'end'}>{adornment}</InputAdornment> : undefined,
            }}
            {...props}
        />
    );
};
