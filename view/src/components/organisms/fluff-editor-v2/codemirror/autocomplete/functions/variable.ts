import { Completion } from '@codemirror/autocomplete';
import { ScanResult, Token, TokenType } from '@flipguard/webapp-fluff-api';

import { COMPARISON_OPERATORS, OPERATOR_COMPLETIONS } from '../completions/operators';
import { VariableCompletions } from '../completions/variables';
import { possibleFixedValues } from '../utils/autocompletion';
import { TokensWrapper } from '../utils/tokens-wrapper';

const BANNED_PRECONDITION_OPERATORS = ['!=', 'not in'];

type Options = {
    inPrecondition: boolean;
};

export const variableAutocompletion = (
    slice: string,
    scanResult: ScanResult,
    variables: VariableCompletions,
    options: Options,
): Completion[] | null => {
    const tokens = TokensWrapper.fromTokens(scanResult.tokens);

    const possiblyTrailingDot = scanResult.errors.length > 0;
    if (possiblyTrailingDot) {
        tokens.removeLast(); // Remove potentially invalid token
        if (tokens.endsOnComparisonOperator()) {
            const identifier = tokens.unsafeAt(-2);
            return valueAutocomplete(identifier, variables, slice);
        }
        return null;
    }

    if (tokens.endsOnComparisonOperator()) {
        const identifier = tokens.unsafeAt(-2);
        const operator = tokens.unsafeAt(-1);
        return afterOperatorAutocomplete(identifier, operator, variables);
    } else if (tokens.endsOn([[TokenType.IDENTIFIER]])) {
        const { lexeme } = tokens.unsafeAt(-1);
        const operators = comparisonOperatorAutocomplete(scanResult, variables, lexeme);
        if (options.inPrecondition) {
            return operators.filter((op) => !BANNED_PRECONDITION_OPERATORS.includes(op.label));
        }
        return operators;
    }

    return null;
};

const afterOperatorAutocomplete = (
    identifier: Token,
    operator: Token,
    variables: VariableCompletions,
): Completion[] | null => {
    const variable = variables.getByName(identifier.lexeme);
    if (variable) {
        const quote = variable.valueType === 'string' ? '"' : '';
        const insideList = operator.type === TokenType.IN || operator.type === TokenType.NOT_IN;
        return possibleFixedValues(variable.possibleValues, quote, insideList);
    }
    return null;
};

const valueAutocomplete = (identifier: Token, variables: VariableCompletions, slice: string): Completion[] | null => {
    const variable = variables.getByName(identifier.lexeme);
    if (!variable) return null;

    const trimmed = slice.trimEnd();
    const shouldAutocompleteValueOnly = trimmed.endsWith('"');
    const shouldAutocompleteWithQuotes = trimmed.endsWith('[') || trimmed.endsWith(',');

    if (shouldAutocompleteValueOnly) {
        // It will autocomplete in places like "^"
        const listStartIdx = slice.lastIndexOf('[');
        const listEndIdx = slice.lastIndexOf(']');
        const insideList = listStartIdx > listEndIdx;
        if (insideList) {
            // Don't show any completions in list directly after another value
            const numOfQuotes = slice.substring(listStartIdx).split('"').length - 1;
            const afterAnotherValue = numOfQuotes % 2 == 0;
            if (afterAnotherValue) {
                return [];
            }
        }
        return possibleFixedValues(variable.possibleValues);
    } else if (shouldAutocompleteWithQuotes) {
        return possibleFixedValues(variable.possibleValues, '"');
    }

    return [];
};

const comparisonOperatorAutocomplete = (scanResult: ScanResult, variables: VariableCompletions, lexeme: string) => {
    const variable = variables.getByName(lexeme);
    if (variable) {
        return variable.possibleOperators
            .filter((op) => COMPARISON_OPERATORS.includes(op))
            .map((op) => OPERATOR_COMPLETIONS[op]);
    }

    const constant = scanResult.tokens.find((tk) => tk.type === TokenType.CONSTANT && tk.lexeme === lexeme);
    if (constant) {
        return variables
            .getConstantCompletions([constant.lexeme])[0]
            .possibleOperators.map((op) => OPERATOR_COMPLETIONS[op]);
    }

    return [];
};
