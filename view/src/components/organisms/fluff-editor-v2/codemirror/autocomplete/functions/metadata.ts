import { Completion } from '@codemirror/autocomplete';
import { ScanResult, TokenType } from '@flipguard/webapp-fluff-api';

import { MetadataCompletions } from '../completions/metadata';
import { possibleFixedValues } from '../utils/autocompletion';
import { TokensWrapper } from '../utils/tokens-wrapper';

export const metadataAutocompletion = (
    slice: string,
    scanResult: ScanResult,
    metadata: MetadataCompletions,
): Completion[] | null => {
    const tokens = TokensWrapper.fromTokens(scanResult.tokens);

    if (scanResult.errors.length > 0 && slice.trimEnd().endsWith('"')) {
        tokens.removeLast(); // Remove potentially invalid token
        if (tokens.endsOn([[TokenType.BLOCK]])) {
            const block = tokens.unsafeAt(-1);
            const completion = metadata.getByName(block.lexeme);
            if (completion) {
                return possibleFixedValues(completion.possibleValues);
            }
        }

        return null;
    }

    const missingMeta = metadata.getMissing(slice);
    if (missingMeta.length > 0) {
        return missingMeta.filter((m) => !slice.includes(m.label));
    }

    if (tokens.endsOn([[TokenType.BLOCK]])) {
        const block = tokens.unsafeAt(-1);
        const completion = metadata.getByName(block.lexeme);
        if (completion) {
            return possibleFixedValues(completion.possibleValues, '"');
        }
    }

    return null;
};
