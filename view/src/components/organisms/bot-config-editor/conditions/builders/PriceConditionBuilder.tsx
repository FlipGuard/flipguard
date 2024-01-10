import { Box } from '@mui/material';
import React, { SetStateAction } from 'react';

import { CustomSelect } from '../../../../atoms/inputs/select/CustomSelect';
import { CustomNumericTextField } from '../../../../atoms/inputs/text-field/CustomNumericTextField';
import { ConditionBuilderProps } from '../Conditions';
import { OperatorSelect } from './utils/OperatorSelect';

export const PriceConditionBuilder = ({ condition, onChange }: ConditionBuilderProps) => {
    const value = (condition.values[0] || '0').trim();
    const isUsd = value.startsWith('$') || value.split(' ').length === 1;
    const currency = isUsd ? '$' : value.split(' ')[1];
    const valueToParse = isUsd ? value.substring(1) : value.split(' ')[0];
    const numericValue = isNaN(parseFloat(valueToParse)) ? 0 : parseFloat(valueToParse);

    const onValueChange = (newState: SetStateAction<number>) => {
        const newNumericValue = typeof newState === 'function' ? newState(numericValue) : newState;
        const newValue = isUsd ? `$${newNumericValue}` : `${newNumericValue} ${currency}`;
        onChange((prev) => ({ ...prev, values: [newValue] }));
    };

    const onCurrencyChange = (newCurrency: string) => {
        const newValue = newCurrency === '$' ? `$${numericValue}` : `${numericValue} ${newCurrency}`;
        onChange((prev) => ({ ...prev, values: [newValue] }));
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <OperatorSelect
                    options={['<', '<=', '!=', '==', '>=', '>']}
                    value={condition.operator}
                    onChange={(op) => onChange((prev) => ({ ...prev, operator: op }))}
                />
            </Box>
            <Box
                sx={{
                    marginTop: '16px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <CustomNumericTextField
                    name={'Amount'}
                    label={'Amount'}
                    sx={{ flexGrow: 1 }}
                    value={numericValue}
                    setValue={onValueChange}
                    minValue={0}
                    maxValue={Number.MAX_SAFE_INTEGER}
                    adornment={currency}
                />
            </Box>
            <Box
                sx={{
                    marginTop: '16px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <CustomSelect
                    sx={{ flexGrow: 1 }}
                    name={'Currency'}
                    label={'Currency'}
                    value={currency}
                    onChange={(e) => onCurrencyChange(e.target.value)}
                    options={[
                        { label: 'MATIC', value: 'MATIC' },
                        { label: 'USDC', value: 'USDC' },
                        { label: 'WETH', value: 'WETH' },
                        { label: '$', value: '$' },
                    ]}
                    select
                    required
                />
            </Box>
        </Box>
    );
};
