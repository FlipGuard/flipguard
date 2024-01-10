import { Diagnostic, linter } from '@codemirror/lint';
import { Fluff } from '@flipguard/webapp-fluff';

import { ActionCompletions } from '../autocomplete/completions/actions';
import { ExtensionCompletions } from '../autocomplete/completions/extensions';
import { MetadataCompletions } from '../autocomplete/completions/metadata';
import { VariableCompletions } from '../autocomplete/completions/variables';
import { LintingFunction } from '../fluff-codemirror-api';
import { correctValuesLinter } from '../linting/correct-values-linter';
import { constantsParsingLinter, scanningLinter } from '../linting/linting-utils';

export const fluffExtensionsLinter: LintingFunction = (params) => {
    const { onLint, ctx } = params;

    const variables = VariableCompletions.init();
    const extensions = ExtensionCompletions.init(ctx.extensions);
    const metadata = MetadataCompletions.init(ctx.permissions);
    const actions = ActionCompletions.init({ ...ctx });
    const triggers = ctx.eventTypes;

    return linter((view) => {
        const diagnostics: Diagnostic[] = [];

        const code = view.state.doc.toJSON().join('\n');
        const scanResult = Fluff.scan(code);

        scanningLinter(scanResult, view, diagnostics);
        constantsParsingLinter(scanResult, view, diagnostics);
        correctValuesLinter({ view: view, triggers, variables, extensions, actions, metadata }, diagnostics);

        onLint(scanResult, diagnostics.length > 0);

        return diagnostics;
    });
};
