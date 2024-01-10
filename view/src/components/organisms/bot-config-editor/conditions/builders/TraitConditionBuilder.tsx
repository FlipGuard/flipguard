import { Box } from '@mui/material';
import React from 'react';

import { CustomTextField } from '../../../../atoms/inputs/text-field/CustomTextField';
import { ConditionBuilderProps } from '../Conditions';
import { AddValueButton } from './utils/AddValueButton';
import { CloseableTextInput } from './utils/CloseableTextInput';
import { OperatorSelect } from './utils/OperatorSelect';

export const TraitConditionBuilder = ({ condition, onChange }: ConditionBuilderProps) => {
    const valueCanBeAdded = condition.values.length < 16;
    const traitName = condition.key ?? '';

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <CustomTextField
                    sx={{ flexGrow: 1 }}
                    name={'Trait name'}
                    label={'Trait name'}
                    placeholder={'E.g. Color'}
                    value={traitName}
                    onChange={(e) => onChange((prev) => ({ ...prev, key: e.target.value }))}
                    inputProps={{ maxLength: 64 }}
                    helperText={'It is case sensitive!'}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '16px' }}>
                <OperatorSelect
                    options={['==', '!=', 'contains', 'ends with', 'starts with']}
                    value={condition.operator}
                    onChange={(op) => onChange((prev) => ({ ...prev, operator: op }))}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    {condition.values.map((value, idx) => (
                        <CloseableTextInput
                            key={idx}
                            closeable={condition.values.length > 1}
                            sx={{
                                margin: '16px 0 0 0',
                                width: '100%',
                            }}
                            name={`Value ${idx + 1}`}
                            label={`Value ${idx + 1}`}
                            placeholder={'E.g. Blue'}
                            value={value}
                            onChange={(e) =>
                                onChange((prev) => {
                                    const newValues = [...prev.values];
                                    newValues[idx] = e.target.value;
                                    return { ...prev, values: newValues };
                                })
                            }
                            onClose={() => {
                                onChange((prev) => {
                                    const left = prev.values.slice(0, idx);
                                    const right = prev.values.slice(idx + 1);
                                    return { ...prev, values: [...left, ...right] };
                                });
                            }}
                            inputProps={{ maxLength: 64 }}
                        />
                    ))}
                    {valueCanBeAdded && (
                        <AddValueButton
                            onClick={() => onChange((prev) => ({ ...prev, values: [...prev.values, ''] }))}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};
