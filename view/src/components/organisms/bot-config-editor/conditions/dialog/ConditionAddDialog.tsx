import { NftEventType } from '@flipguard/domain';
import {
    BotWizardCondition,
    getVariableMetaForFluffName,
    isValidForTrigger,
    VariableFluffName,
} from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Box, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import isViewMobile from '../../../../../hooks/utils/isViewMobile';
import { CustomDialog } from '../../../../atoms/feedback/dialog/CustomDialog';
import { PrimaryButton } from '../../../../atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../atoms/inputs/button/TertiaryButton';
import { BOT_WIZARD_CONDITIONS_META } from '../Conditions';
import { ConditionSummary } from '../ConditionSummary';
import { ConditionTab } from './ConditionTab';

const INITIAL_CONDITION: BotWizardCondition = {
    variable: 'nft.traits',
    key: '',
    operator: '==',
    values: [''],
};

type Props = {
    open: boolean;
    onClose: () => void;
    trigger: NftEventType;
    addCondition: (condition: BotWizardCondition) => void;
};

export const ConditionAddDialog = ({ open, onClose, trigger, addCondition }: Props) => {
    const isMobile = isViewMobile('sm');

    const [condition, setCondition] = useState<BotWizardCondition>(INITIAL_CONDITION);

    const getValidOperators = (name: VariableFluffName) => {
        const { valueType } = getVariableMetaForFluffName(name);
        if (valueType !== 'number') {
            return ['==', '!='];
        }
        return ['<', '<=', '==', '!=', '>=', '>'];
    };

    useEffect(() => {
        setCondition((prev) => ({
            ...prev,
            key: undefined,
            operator: getValidOperators(prev.variable).includes(condition.operator) ? condition.operator : '==',
            values: [''],
        }));
    }, [condition.variable]);

    const availableVariables = Object.keys(BOT_WIZARD_CONDITIONS_META) as VariableFluffName[];
    const validVariables = availableVariables.filter((v) => isValidForTrigger(v, trigger)).sort();
    const isTraitWithoutKey = condition.variable === 'nft.traits' && !condition.key;
    const noValueProvided = condition.values.filter((v) => v !== '').length === 0;
    const addingDisabled = noValueProvided || isTraitWithoutKey;

    const getVariableName = (variable: VariableFluffName) => {
        const conditionMeta = BOT_WIZARD_CONDITIONS_META[variable];
        return conditionMeta ? conditionMeta.variableName : '';
    };

    const handleClose = () => {
        onClose();
        setCondition(INITIAL_CONDITION);
    };

    return (
        <CustomDialog
            sx={{ '& .MuiPaper-root': { width: isMobile ? 'auto' : '720px', minHeight: isMobile ? 'auto' : '470px' } }}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '12px 6px 12px 12px',
                    wordBreak: 'break-word',
                }}
            >
                Add condition
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={handleClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent
                sx={(theme) => ({
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    paddingLeft: '12px',
                    paddingRight: '16px',
                    scrollbarWidth: 'thin',
                    scrollbarColor: `${theme.palette.primaryBorder.main} ${theme.palette.primary.dark}`,
                    '&::-webkit-scrollbar': {
                        width: '0.3em',
                        height: '0.3em',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: `${theme.palette.primaryBorder.main}`,
                        borderRadius: '999px',
                    },
                })}
            >
                <Box sx={{ marginTop: '8px', border: '1px solid #444', borderRadius: '6px', height: 'fit-content' }}>
                    {validVariables
                        .sort((a, b) => getVariableName(a).localeCompare(getVariableName(b)))
                        .map((v, idx) => (
                            <ConditionTab
                                key={idx}
                                sx={{
                                    borderTop: idx > 0 ? '1px solid #444' : 'none',
                                }}
                                name={getVariableName(v)}
                                active={condition.variable === v}
                                onClick={() => setCondition((prev) => ({ ...prev, variable: v }))}
                            />
                        ))}
                </Box>
                <Box sx={{ padding: isMobile ? '0' : '0px 0px 12px 18px' }}>
                    <Box sx={{ marginTop: '8px', padding: isMobile ? '12px 0 18px 0' : '0' }}>
                        <ConditionBuilder condition={condition} setCondition={setCondition} />
                    </Box>
                    {!isMobile && <Divider sx={{ margin: '24px 0 16px 0' }} />}
                    <Box>
                        <ConditionSummary showFallback={addingDisabled} trigger={trigger} condition={condition} />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'space-between',
                    padding: '12px',
                }}
            >
                <TertiaryButton onClick={handleClose}>Cancel</TertiaryButton>
                <PrimaryButton
                    onClick={() => {
                        addCondition(condition);
                        handleClose();
                    }}
                    disabled={addingDisabled}
                >
                    {isMobile ? 'Add' : 'Add Condition'}
                </PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};

type ConditionBuilderProps = {
    condition: BotWizardCondition;
    setCondition: Dispatch<SetStateAction<BotWizardCondition>>;
};

const ConditionBuilder = ({ condition, setCondition }: ConditionBuilderProps) => {
    const conditionMeta = BOT_WIZARD_CONDITIONS_META[condition.variable];
    const Builder = conditionMeta?.builder;
    return Builder ? <Builder condition={condition} onChange={setCondition} /> : null;
};
