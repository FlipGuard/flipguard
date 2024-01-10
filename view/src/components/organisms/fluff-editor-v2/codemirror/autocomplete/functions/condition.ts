import { Completion } from '@codemirror/autocomplete';
import { ScanResult } from '@flipguard/webapp-fluff-api';

import { LOGICAL_OPERATOR_COMPLETIONS } from '../completions/operators';
import { VariableCompletions } from '../completions/variables';
import { TokensWrapper } from '../utils/tokens-wrapper';

type Options = {
    disabled: boolean;
    conditions: boolean;
    multipleConditions: boolean;
    inPrecondition: boolean;
};

export const conditionAutocompletion = (
    slice: string,
    scanResult: ScanResult,
    variables: VariableCompletions,
    options: Options,
): Completion[] | null => {
    if (options.disabled) {
        return null;
    }

    const tokens = TokensWrapper.fromTokens(scanResult.tokens);

    if (!tokens.endsOnValue()) {
        return null;
    }

    const hintLogicalOperators = tokens.endsOnConditionalExpression() ? options.multipleConditions : options.conditions;
    if (!hintLogicalOperators) {
        return null;
    }

    const operators = Object.values(LOGICAL_OPERATOR_COMPLETIONS);
    return options.inPrecondition ? operators.filter((op) => op.label !== 'or') : operators;
};
