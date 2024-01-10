import { Box } from '@mui/material';
import React from 'react';

import { ConditionBuilderProps } from '../Conditions';
import { AddValueButton } from './utils/AddValueButton';
import { CloseableTextInput } from './utils/CloseableTextInput';
import { OperatorSelect } from './utils/OperatorSelect';

export const StringConditionBuilder = ({ condition, onChange }: ConditionBuilderProps) => {
    const valueCanBeAdded = condition.values.length < 16;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <OperatorSelect
                    options={[
                        '==',
                        '!=',
                        'contains',
                        'does not contain',
                        'ends with',
                        'does not end with',
                        'starts with',
                        'does not start with',
                    ]}
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
