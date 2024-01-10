import { Box } from '@mui/material';
import React from 'react';

import { CustomNumericTextField } from '../../../../atoms/inputs/text-field/CustomNumericTextField';
import { ConditionBuilderProps } from '../Conditions';
import { OperatorSelect } from './utils/OperatorSelect';

export const RankConditionBuilder = ({ condition, onChange }: ConditionBuilderProps) => {
    const value = (condition.values[0] || '0').trim();
    const numericValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value);

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
                    name={'Rarity Rank'}
                    label={'Rarity Rank'}
                    sx={{ flexGrow: 1 }}
                    value={numericValue}
                    onValueChange={(value) => onChange((prev) => ({ ...prev, values: ['' + value] }))}
                    minValue={0}
                    maxValue={Number.MAX_SAFE_INTEGER}
                />
            </Box>
        </Box>
    );
};
