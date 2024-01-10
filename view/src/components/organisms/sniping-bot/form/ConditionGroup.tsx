import { SnipingSingleCollectionBotWizardConfigModel } from '@flipguard/webapp-api';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Box, BoxProps, FormLabel } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

import { ConditionSection } from './ConditionSection';

type Props = BoxProps & {
    groupIdx: number;
    wizardBotConfig: SnipingSingleCollectionBotWizardConfigModel;
    setWizardBotConfig: Dispatch<SetStateAction<SnipingSingleCollectionBotWizardConfigModel>>;
};

export const ConditionGroup = ({ groupIdx, wizardBotConfig, setWizardBotConfig, ...props }: Props) => {
    return (
        <Box {...props}>
            <Box
                sx={(theme) => ({
                    margin: '16px 8px 16px 8px',
                    position: 'relative',
                    borderTop: `1px dashed ${theme.palette.inputBorder.main}`,
                })}
            >
                <FormLabel
                    sx={(theme) => ({
                        transform: 'translate(14px, -9px) scale(0.75)',
                        transformOrigin: 'top left',
                        top: '0px',
                        left: '-6px',
                        position: 'absolute',
                        color: theme.palette.inputLabel.main,
                        background: theme.palette.primary.main,
                        padding: '0px 6px',
                    })}
                >
                    {`Filter ${groupIdx + 1}`}
                </FormLabel>
                <HighlightOffOutlinedIcon
                    sx={(theme) => ({
                        color: '#aaa',
                        backgroundColor: theme.palette.primary.main,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        zIndex: 2,
                        position: 'absolute',
                        right: -8,
                        top: -10,
                        '&:hover': {
                            cursor: 'pointer',
                            color: '#ddd',
                        },
                    })}
                    onClick={() =>
                        setWizardBotConfig((prev) => ({
                            ...prev,
                            conditions: prev.conditions.filter((_, idx) => idx !== groupIdx),
                        }))
                    }
                />
            </Box>
            <ConditionSection
                conditions={wizardBotConfig.conditions[groupIdx]}
                onConditionAdd={(condition) => {
                    setWizardBotConfig((prev) => {
                        const newConditions = [...prev.conditions];
                        newConditions[groupIdx] = [
                            ...prev.conditions[groupIdx],
                            {
                                ...condition,
                                values: condition.values.filter((v) => v !== ''),
                            },
                        ];
                        return { ...prev, conditions: newConditions };
                    });
                }}
                onConditionRemove={(idx) => {
                    setWizardBotConfig((prev) => {
                        const newConditions = [...prev.conditions];
                        const left = prev.conditions[groupIdx].slice(0, idx);
                        const right = prev.conditions[groupIdx].slice(idx + 1);
                        newConditions[groupIdx] = [...left, ...right];
                        return { ...prev, conditions: newConditions };
                    });
                }}
            />
        </Box>
    );
};
