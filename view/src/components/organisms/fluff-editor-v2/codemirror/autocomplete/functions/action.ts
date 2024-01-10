import { Completion } from '@codemirror/autocomplete';
import { NftEventType } from '@flipguard/domain';
import { ScanResult, TokenType } from '@flipguard/webapp-fluff-api';

import { ActionCompletions } from '../completions/actions';
import { VariableCompletions } from '../completions/variables';
import { possibleFixedValues } from '../utils/autocompletion';
import { TokensWrapper } from '../utils/tokens-wrapper';

export const actionAutocompletion = (
    slice: string,
    scanResult: ScanResult,
    variables: VariableCompletions,
    actions: ActionCompletions,
    trigger: NftEventType,
): Completion[] | null => {
    const tokens = TokensWrapper.fromTokens(scanResult.tokens);

    if (scanResult.errors.length > 0) {
        const insideAction = tokens.endsOn([[TokenType.FUNCTION], [TokenType.LEFT_PAREN], [TokenType.DICT]]);
        if (!insideAction) {
            return null;
        }

        const params = tokens.unsafeAt(-1);
        const func = tokens.unsafeAt(-3);

        const action = actions.getByName(func.lexeme);
        if (action) {
            const trimmed = slice.trimEnd();
            const insideActionSubstr = slice.substring(slice.lastIndexOf('{'));
            const numOfQuotes = insideActionSubstr.split('"').length - 1;
            const insideParamString = trimmed.endsWith('"') && numOfQuotes % 2 == 1;
            const afterParamName = trimmed.endsWith(':');

            if (insideParamString || afterParamName) {
                const quote = afterParamName ? '"' : '';
                const match = insideActionSubstr.match(/[a-zA-Z_]+:/g);
                const paramName = match ? match[match.length - 1] : undefined;
                const paramCompletion = action.params.find((c) => c.label + ':' === paramName);
                return paramCompletion ? possibleFixedValues(paramCompletion.possibleValuesFor(trigger), quote) : [];
            }

            return action.params.filter((p) => params.literal[p.label] === undefined);
        }
    }

    if (tokens.endsOn([[TokenType.FUNCTION], [TokenType.LEFT_PAREN]])) {
        const func = tokens.unsafeAt(-2);
        const action = actions.getByName(func.lexeme);
        if (action && action.params.length > 0) {
            const paramsCompletion = actions.getAllParamCompletions(action.label);
            return paramsCompletion ? [paramsCompletion] : [];
        }

        return [];
    }

    return null;
};
