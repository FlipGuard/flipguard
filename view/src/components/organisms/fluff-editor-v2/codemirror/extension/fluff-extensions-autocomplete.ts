import { Completion, CompletionContext } from '@codemirror/autocomplete';
import { Fluff } from '@flipguard/webapp-fluff';
import { TokenType } from '@flipguard/webapp-fluff-api';

import { KEYWORD_COMPLETIONS } from '../autocomplete/completions/keywords';
import { VariableCompletions } from '../autocomplete/completions/variables';
import { conditionAutocompletion } from '../autocomplete/functions/condition';
import { expressionAutocompletion } from '../autocomplete/functions/expression';
import { variableAutocompletion } from '../autocomplete/functions/variable';
import { TokensWrapper } from '../autocomplete/utils/tokens-wrapper';
import { AutocompleteFunction } from '../fluff-codemirror-api';

const WORD_REGEX = /(\w\.?)*/;

export const fluffExtensionsAutocomplete: AutocompleteFunction = (params) => {
    const { ctx } = params;

    const variables = VariableCompletions.init();

    return (context: CompletionContext) => {
        const word = context.matchBefore(WORD_REGEX);
        if (!word || (word.from == word.to && !context.explicit) || insideComment(context)) {
            return null;
        }

        const slice = context.state.sliceDoc(0, context.pos);
        const scanResult = Fluff.scan(slice);
        const tokens = TokensWrapper.fromContext(context);

        if (tokens.endsOn([[TokenType.DEF, TokenType.ARROW]]) || tokens.before(TokenType.RIGHT_BRACE)) {
            return null;
        }

        const afterSwitch = tokens.endsOn([[TokenType.SWITCH], [TokenType.LEFT_BRACE]]);
        const afterSwitchValue = tokens.endsOn([[TokenType.ARROW], [TokenType.NUMBER, TokenType.STRING]]);
        const afterAssignment = tokens.endsOn([[TokenType.EQUAL]]);
        const afterCase = tokens.endsOn([[TokenType.CASE]]);
        const insideSwitchCase = tokens.endsInsideSwitchCase();

        // Keywords

        if (afterSwitch || afterSwitchValue) {
            return completions(context, word.text, [KEYWORD_COMPLETIONS.case]);
        }

        // Variable values/operators

        const variableHints = variableAutocompletion(slice, scanResult, variables, { inPrecondition: false });
        if (variableHints) {
            return completions(context, word.text, variableHints);
        }

        // Conditions operators

        const operatorHints = conditionAutocompletion(slice, scanResult, variables, {
            conditions: insideSwitchCase,
            multipleConditions: !insideSwitchCase,
            disabled: afterSwitchValue,
            inPrecondition: false,
        });

        if (operatorHints) {
            return completions(context, word.text, operatorHints);
        }

        // Variable names

        if (afterCase || afterAssignment) {
            const exprHints = expressionAutocompletion(slice, scanResult, variables, {
                eventTypes: ctx.eventTypes,
                inPrecondition: false,
            });

            const hints = exprHints ? exprHints : [];
            afterAssignment && hints.push(KEYWORD_COMPLETIONS.switch);

            return completions(context, word.text, hints);
        }

        // Completions for empty state

        return completions(context, word.text, [KEYWORD_COMPLETIONS.def]);
    };
};

const completions = (context: CompletionContext, word: string, completions: Completion[]) => ({
    from: context.pos - word.length,
    options: completions,
    validFor: new RegExp(`^${WORD_REGEX.source}$`),
});

const insideComment = (context: CompletionContext) => {
    const line = context.state.doc.lineAt(context.pos);
    const commentStartIdx = line.text.indexOf('#');
    return commentStartIdx !== -1 && context.pos > line.from + commentStartIdx;
};
