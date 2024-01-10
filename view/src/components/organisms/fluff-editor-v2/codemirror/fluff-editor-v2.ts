import { autocompletion } from '@codemirror/autocomplete';
import { indentWithTab } from '@codemirror/commands';
import { indentUnit, StreamLanguage, syntaxHighlighting } from '@codemirror/language';
import { EditorState, Extension } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { ScanResult } from '@flipguard/webapp-fluff-api';
import { useTheme } from '@mui/material';
import { basicSetup, EditorView } from 'codemirror';
import { useCallback, useEffect, useState } from 'react';

import { fluffBotAutocomplete } from './bot/fluff-bot-autocomplete';
import { fluffBotLinter } from './bot/fluff-bot-linter';
import { fluffExtensionsAutocomplete } from './extension/fluff-extensions-autocomplete';
import { fluffExtensionsLinter } from './extension/fluff-extensions-linter';
import { FluffEditorContext } from './fluff-codemirror-api';
import { FluffStreamParserV2 } from './fluff-stream-parser';
import { getFluffHighlight, getFluffTheme } from './fluff-theme';

export type FluffEditorMode = 'bot' | 'extension';

type Props = {
    initialState?: string[];
    onChange: (state: string[]) => void;
    onLint: (scanResult: ScanResult, errorsFound: boolean) => void;
    mode: FluffEditorMode;
    ctx: FluffEditorContext;
};

export default function useFluffEditorV2({ initialState, onChange, onLint, mode, ctx }: Props) {
    const [element, setElement] = useState<HTMLElement>();
    const theme = useTheme();

    const ref = useCallback((node: HTMLElement | null) => {
        node && setElement(node);
    }, []);

    useEffect(() => {
        if (!element) return;

        const extensions: Extension[] = [
            basicSetup,
            keymap.of([indentWithTab]),
            EditorView.updateListener.of(({ state }) => onChange(state.doc.toJSON())),
            getFluffTheme(theme),
            syntaxHighlighting(getFluffHighlight()),
            indentUnit.of(' '.repeat(4)),
            EditorState.readOnly.of(ctx.readOnly),
        ];

        if (mode === 'extension') {
            !ctx.readOnly && extensions.push(fluffExtensionsLinter({ ctx, onLint }));
            extensions.push(
                StreamLanguage.define(
                    new FluffStreamParserV2({
                        autocompleteFn: fluffExtensionsAutocomplete({ ctx }),
                    }),
                ),
            );
        } else if (mode === 'bot') {
            !ctx.readOnly && extensions.push(fluffBotLinter({ ctx, onLint }));
            extensions.push(
                StreamLanguage.define(
                    new FluffStreamParserV2({
                        autocompleteFn: fluffBotAutocomplete({ ctx }),
                    }),
                ),
            );
        }

        if (ctx.readOnly) {
            extensions.push(autocompletion({ override: [] }));
        }

        const view = new EditorView({
            state: EditorState.create({
                doc: (initialState ?? []).join('\n'),
                extensions: extensions,
            }),
            parent: element,
        });

        return () => view.destroy();
    }, [element, ctx.readOnly, JSON.stringify(ctx)]);

    return { ref };
}
