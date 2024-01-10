import { BotWizardConditionMathOperator } from '@flipguard/webapp-api';
import React from 'react';

import { CustomSelect } from '../../../../../atoms/inputs/select/CustomSelect';

type Props = {
    options: BotWizardConditionMathOperator[];
    value: BotWizardConditionMathOperator;
    onChange: (op: BotWizardConditionMathOperator) => void;
};

export const OperatorSelect = ({ options, value, onChange }: Props) => {
    return (
        <CustomSelect
            sx={{
                flexGrow: 1,
                '& .MuiInputBase-input': { fontFamily: "'JetBrains Mono', sans-serif" },
            }}
            MenuItemProps={{ sx: { fontFamily: "'JetBrains Mono', sans-serif" } }}
            name={'Comparison Operator'}
            label={'Comparison Operator'}
            value={value}
            onChange={(e) => onChange(e.target.value as BotWizardConditionMathOperator)}
            options={options.map((op) => ({ label: op, value: op }))}
            select
            required
        />
    );
};
