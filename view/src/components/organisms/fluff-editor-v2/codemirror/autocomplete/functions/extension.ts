import { Completion } from '@codemirror/autocomplete';
import { NftEventType } from '@flipguard/domain';
import { ScanResult, TokenType } from '@flipguard/webapp-fluff-api';

import { ExtensionCompletions } from '../completions/extensions';
import { TokensWrapper } from '../utils/tokens-wrapper';

export const extensionAutocompletion = (
    slice: string,
    scanResult: ScanResult,
    extensions: ExtensionCompletions,
    tokens: TokensWrapper,
    trigger: NftEventType,
): Completion[] | null => {
    if (scanResult.errors.length > 0) {
        tokens.removeLast(); // Remove potentially invalid token
        if (tokens.endsOn([[TokenType.FROM]])) {
            return extensions.getAll(trigger).map((name) => ({
                label: name,
                apply: name,
                boost: 10,
            }));
        }
        return null;
    }

    const [inImport, skipped] = tokens.endsOnWithSkip(
        [[TokenType.USE], [TokenType.LEFT_BRACE]],
        TokenType.CONSTANT,
        TokenType.COMMA,
    );

    if (inImport) {
        const extension = extensions.getByName(tokens.inferNextExtensionName(), trigger);
        if (extension) {
            const alreadyImportedConstants = skipped.map((tk) => tk.lexeme);
            return extension.constantsCompletions.filter((c) => !alreadyImportedConstants.includes(c.label));
        } else {
            return [];
        }
    }

    if (tokens.endsOn([[TokenType.FROM]])) {
        return extensions.getAll(trigger).map((name) => ({
            label: '"' + name + '"',
            apply: '"' + name + '"',
            boost: 10,
        }));
    }

    return null;
};
