import { syntaxTree } from '@codemirror/language';
import { Diagnostic } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';
import { Fluff } from '@flipguard/webapp-fluff';
import { ParseError, ScanError, ScanResult } from '@flipguard/webapp-fluff-api';

export type LintingNode = {
    type: string;
    value: string;
    from: number;
    to: number;
};

export const getNodesFromEditorView = (view: EditorView): LintingNode[] => {
    const nodes: LintingNode[] = [];

    syntaxTree(view.state)
        .cursor()
        .iterate((node) => {
            const value = view.state.sliceDoc(node.from, node.to);
            nodes.push({
                type: node.name,
                value: value.trim(),
                from: node.from + trimmedFrom(value),
                to: node.to - trimmedTo(value),
            });
        });

    return nodes;
};

export const trimmedFrom = (text: string) => {
    return text.length - text.trimStart().length;
};

export const trimmedTo = (text: string) => {
    return text.length - text.trimEnd().length;
};

export const scanningLinter = (scanResult: ScanResult, view: EditorView, diagnostics: Diagnostic[]) => {
    scanResult.errors.forEach((error) => diagnostics.push(toDiagnostic(error, view)));
};

export const parsingLinter = (scanResult: ScanResult, view: EditorView, diagnostics: Diagnostic[]) => {
    if (scanResult.errors.length > 0 || diagnostics.length > 0) return;

    const parseResult = Fluff.parseProgram(scanResult.tokens);
    parseResult.errors.forEach((error) => diagnostics.push(toDiagnostic(error, view)));
};

export const constantsParsingLinter = (scanResult: ScanResult, view: EditorView, diagnostics: Diagnostic[]) => {
    if (scanResult.errors.length > 0 || diagnostics.length > 0) return;

    try {
        const parseResult = Fluff.parseConstants(scanResult.tokens);
        parseResult.errors.forEach((error) => diagnostics.push(toDiagnostic(error, view)));
    } catch (err) {
        diagnostics.push(toDiagnostic(err as ParseError, view));
    }
};

export const toDiagnostic = (error: ScanError | ParseError, view: EditorView): Diagnostic => {
    const fromLine = view.state.doc.line(error.from.line);
    const toLine = view.state.doc.line(error.to.line);
    return {
        from: Math.min(fromLine.from + error.from.pos, fromLine.to),
        to: Math.min(toLine.from + error.to.pos, toLine.to),
        severity: 'error',
        message: error.message,
    };
};
