import { Diagnostic } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';

import { getNodesFromEditorView, LintingNode } from './linting-utils';

export const bannedTokenLinter = (config: Config, diagnostics: Diagnostic[]) => {
    return new BannedTokensLinter(config).lint(diagnostics);
};

type Config = {
    view: EditorView;
    precondition: {
        bannedTokens: string[];
        bannedConstants: string[];
    };
};

class BannedTokensLinter {
    private readonly nodes: LintingNode[] = [];
    private readonly bannedTokens: string[];
    private readonly bannedConstants: string[];
    private current = 0;
    private diagnostics: Diagnostic[] = [];

    public constructor({ view, precondition }: Config) {
        this.nodes = getNodesFromEditorView(view);
        this.bannedTokens = precondition.bannedTokens;
        this.bannedConstants = precondition.bannedConstants;
    }

    public lint = (diagnostics: Diagnostic[]): Diagnostic[] => {
        this.current = 0;
        this.diagnostics = diagnostics;

        let insidePreconditionBlock = false;

        while (!this.isAtEnd()) {
            const node = this.advance();

            if (insidePreconditionBlock) {
                if (node.type === 'labelName') {
                    insidePreconditionBlock = false;
                } else if (this.bannedTokens.includes(node.value)) {
                    this.diagnostics.push(diagnosticFrom(node, `You cannot use "${node.value}" here`));
                } else if (this.bannedConstants.includes(node.value)) {
                    this.diagnostics.push(diagnosticFrom(node, `You cannot use constants here`));
                }
            }

            if (node.type === 'labelName' && node.value === 'preconditions:') {
                insidePreconditionBlock = true;
            }
        }

        return this.diagnostics;
    };

    // Utils

    private advance = (): LintingNode => {
        return this.nodes[this.current++];
    };

    private isAtEnd = () => {
        return this.current >= this.nodes.length;
    };
}

const diagnosticFrom = (node: LintingNode, message: string, severity: 'warning' | 'error' = 'warning'): Diagnostic => {
    return {
        from: node.from,
        to: node.to,
        severity: severity,
        message: message,
    };
};
