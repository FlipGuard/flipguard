import { Completion, CompletionContext } from '@codemirror/autocomplete';
import { Fluff } from '@flipguard/webapp-fluff';
import { TokenType } from '@flipguard/webapp-fluff-api';

import { ActionCompletions } from '../autocomplete/completions/actions';
import { BLOCK_COMPLETIONS } from '../autocomplete/completions/blocks';
import { ExtensionCompletions } from '../autocomplete/completions/extensions';
import { KEYWORD_COMPLETIONS } from '../autocomplete/completions/keywords';
import { MetadataCompletions } from '../autocomplete/completions/metadata';
import { VariableCompletions } from '../autocomplete/completions/variables';
import { actionAutocompletion } from '../autocomplete/functions/action';
import { conditionAutocompletion } from '../autocomplete/functions/condition';
import { expressionAutocompletion } from '../autocomplete/functions/expression';
import { extensionAutocompletion } from '../autocomplete/functions/extension';
import { metadataAutocompletion } from '../autocomplete/functions/metadata';
import { variableAutocompletion } from '../autocomplete/functions/variable';
import { TokensWrapper } from '../autocomplete/utils/tokens-wrapper';
import { AutocompleteFunction } from '../fluff-codemirror-api';

const WORD_REGEX = /(\w\.?)*/;

export const fluffBotAutocomplete: AutocompleteFunction = (params) => {
    const { ctx } = params;

    const metadata = MetadataCompletions.init(ctx.permissions);
    const extensions = ExtensionCompletions.init(ctx.extensions);
    const actions = ActionCompletions.init({
        integrations: ctx.integrations,
        templates: ctx.templates,
    }).forPermissions(ctx.permissions);

    return (context: CompletionContext) => {
        const word = context.matchBefore(WORD_REGEX);
        if (!word || (word.from == word.to && !context.explicit) || insideComment(context)) {
            return null;
        }

        const slice = context.state.sliceDoc(0, context.pos);
        const scanResult = Fluff.scan(slice);
        const tokens = TokensWrapper.fromContext(context);

        // Metadata

        const metadataHints = metadataAutocompletion(slice, scanResult, metadata);
        if (metadataHints) {
            return completions(context, word.text, metadataHints);
        }

        const trigger = tokens.inferTrigger();

        if (trigger) {
            const extensionHints = extensionAutocompletion(slice, scanResult, extensions, tokens, trigger);
            if (extensionHints) {
                return completions(context, word.text, extensionHints);
            }
        }

        const variables = trigger ? VariableCompletions.initForTrigger(trigger) : VariableCompletions.init();

        const [previousBlock] = tokens.findLast(TokenType.BLOCK);
        const afterDef = tokens.findLast(TokenType.DEF)[0] !== undefined;

        // Constants

        const afterSwitch = tokens.endsOn([[TokenType.SWITCH], [TokenType.LEFT_BRACE]]);
        const afterSwitchValue = tokens.endsOn([[TokenType.ARROW], [TokenType.NUMBER, TokenType.STRING]]);
        const afterAssignment = tokens.endsOn([[TokenType.EQUAL]]);
        const afterCase = tokens.endsOn([[TokenType.CASE]]);
        const insideSwitchCase = tokens.endsInsideSwitchCase();

        const afterSwitchCaseValue = tokens.endsOn([[TokenType.DEF, TokenType.ARROW]]);
        const afterDefaultSwitchCase = insideSwitchCase && tokens.before(TokenType.RIGHT_BRACE);

        if (afterSwitchCaseValue || afterDefaultSwitchCase) {
            return null;
        }

        const afterPreconditionsBlock = previousBlock?.lexeme === 'preconditions:';
        const afterIfBlock = previousBlock?.lexeme === 'if:';
        const afterThenBlock = previousBlock?.lexeme === 'then:';

        // Keywords

        if (afterSwitch || afterSwitchValue) {
            return completions(context, word.text, [KEYWORD_COMPLETIONS.case]);
        }

        // Variable values/operators

        const variableHints = variableAutocompletion(slice, scanResult, variables, {
            inPrecondition: afterPreconditionsBlock,
        });

        if (variableHints) {
            return completions(context, word.text, variableHints);
        }

        // Conditions operators

        const operatorHints = conditionAutocompletion(slice, scanResult, variables, {
            conditions: insideSwitchCase,
            multipleConditions: !insideSwitchCase,
            disabled: afterSwitchValue || afterThenBlock,
            inPrecondition: afterPreconditionsBlock,
        });

        if (operatorHints) {
            afterIfBlock && operatorHints.push(BLOCK_COMPLETIONS.then);
            afterPreconditionsBlock && operatorHints.push(BLOCK_COMPLETIONS.if);
            return completions(context, word.text, operatorHints);
        }

        // Variable names

        if (afterCase || afterAssignment || afterPreconditionsBlock || afterIfBlock) {
            const exprHints = expressionAutocompletion(slice, scanResult, variables, {
                eventTypes: ctx.eventTypes,
                inPrecondition: afterPreconditionsBlock,
            });

            const hints = exprHints ? exprHints : [];
            afterAssignment && hints.push(KEYWORD_COMPLETIONS.switch);
            afterIfBlock && hints.push(BLOCK_COMPLETIONS.then);

            return completions(context, word.text, hints);
        }

        // Action
        if (afterThenBlock && trigger) {
            const actionCompletions = actions.forTrigger(trigger);
            const options = actionAutocompletion(slice, scanResult, variables, actionCompletions, trigger);
            if (options) {
                return completions(context, word.text, options);
            }

            return completions(context, word.text, [...actionCompletions.getAll(), BLOCK_COMPLETIONS.if]);
        }

        // Completions for empty state

        const defaultCompletions = [KEYWORD_COMPLETIONS.def, BLOCK_COMPLETIONS.preconditions, BLOCK_COMPLETIONS.if];
        !afterDef && defaultCompletions.push(KEYWORD_COMPLETIONS.use);
        return completions(context, word.text, defaultCompletions);
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
