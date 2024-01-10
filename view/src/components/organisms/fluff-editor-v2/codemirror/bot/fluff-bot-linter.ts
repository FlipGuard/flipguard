import { Diagnostic, linter } from '@codemirror/lint';
import { Fluff } from '@flipguard/webapp-fluff';

import { ActionCompletions } from '../autocomplete/completions/actions';
import { ExtensionCompletions } from '../autocomplete/completions/extensions';
import { MetadataCompletions } from '../autocomplete/completions/metadata';
import { VariableCompletions } from '../autocomplete/completions/variables';
import { TokensWrapper } from '../autocomplete/utils/tokens-wrapper';
import { LintingFunction } from '../fluff-codemirror-api';
import { bannedTokenLinter } from '../linting/banned-tokens-linter';
import { correctValuesLinter } from '../linting/correct-values-linter';
import { parsingLinter, scanningLinter } from '../linting/linting-utils';

export const fluffBotLinter: LintingFunction = (params) => {
    const { onLint, ctx } = params;

    const metadata = MetadataCompletions.init(ctx.permissions);
    const extensions = ExtensionCompletions.init(ctx.extensions);
    const actionCompletions = ActionCompletions.init({
        integrations: ctx.integrations,
        templates: ctx.templates,
    }).forPermissions(ctx.permissions);

    return linter((view) => {
        const diagnostics: Diagnostic[] = [];

        const code = view.state.sliceDoc(0);
        const scanResult = Fluff.scan(code);

        scanningLinter(scanResult, view, diagnostics);
        parsingLinter(scanResult, view, diagnostics);

        const tokens = TokensWrapper.fromTokens(scanResult.tokens);
        const trigger = tokens.inferTrigger();

        const variables = trigger ? VariableCompletions.initForTrigger(trigger) : VariableCompletions.init();
        const actions = trigger ? actionCompletions.forTrigger(trigger) : actionCompletions;
        const triggers = trigger ? [trigger] : [];

        const { constants } = correctValuesLinter(
            {
                view: view,
                triggers: triggers,
                variables: variables,
                actions: actions,
                extensions: extensions,
                metadata: metadata,
            },
            diagnostics,
        );

        bannedTokenLinter(
            {
                view: view,
                precondition: {
                    bannedTokens: ['or', '!=', 'not', 'not in'],
                    bannedConstants: [...constants],
                },
            },
            diagnostics,
        );

        onLint(scanResult, diagnostics.length > 0);

        return diagnostics;
    });
};
