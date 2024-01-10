import { NftEventType } from '@flipguard/domain';
import { BotWizardCondition, BotWizardConditionMathOperator, getVariableMetaForFluffName } from '@flipguard/webapp-api';
import { Typography } from '@mui/material';

import { BOT_WIZARD_CONDITIONS_META } from './Conditions';

type Props = {
    showFallback: boolean;
    trigger: NftEventType;
    condition: BotWizardCondition;
};

export const ConditionSummary = ({ showFallback, trigger, condition }: Props) => {
    const isNumeric = getVariableMetaForFluffName(condition.variable).valueType === 'number';
    const event = trigger.toLowerCase();
    const name = getVariableName(condition);
    const op = getTextForOperator(condition.operator);
    const value = showFallback
        ? '...'
        : getTextForValues(condition.values, isNumeric ? '' : '"', isNegatedOperator(condition.operator));

    return (
        <Typography sx={{ color: '#aaa' }}>
            This condition will match every <span>{event}</span> where <span style={{ color: '#fff' }}>{name}</span>{' '}
            <span>{op}</span> <span style={{ color: '#fff' }}>{value}</span>
        </Typography>
    );
};

const getTextForOperator = (op: BotWizardConditionMathOperator) => {
    switch (op) {
        case '<':
            return 'is less than';
        case '<=':
            return 'is less than or equal to';
        case '==':
            return 'is equal to';
        case '!=':
            return 'is not equal to';
        case '>=':
            return 'is greater than or equal to';
        case '>':
            return 'is greater than';
        case 'contains':
            return 'contains';
        case 'ends with':
            return 'ends with';
        case 'starts with':
            return 'starts with';
        case 'does not contain':
            return 'does not contain';
        case 'does not end with':
            return 'does not end with';
        case 'does not start with':
            return 'does not start with';
    }
};

const isNegatedOperator = (op: BotWizardConditionMathOperator) => {
    return op === '!=' || op.startsWith('does not');
};

const getVariableName = (condition: BotWizardCondition) => {
    const conditionMeta = BOT_WIZARD_CONDITIONS_META[condition.variable];
    return conditionMeta ? conditionMeta.conditionSummaryName(condition) : '';
};

const getTextForValues = (values: string[], quote: string, negated: boolean) => {
    const filtered = values.filter((v) => v !== '');
    const exceptLast = filtered.slice(0, -1);
    const last = filtered[filtered.length - 1];
    const lastPrefix = exceptLast.length > 0 ? (negated ? ' and ' : ' or ') : '';
    return exceptLast.map((v) => quote + v + quote).join(', ') + lastPrefix + quote + last + quote;
};
