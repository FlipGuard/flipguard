import { Completion } from '@codemirror/autocomplete';
import { NftEventType } from '@flipguard/domain';
import { ScanResult, TokenType } from '@flipguard/webapp-fluff-api';

import { VariableCompletions } from '../completions/variables';
import { TokensWrapper } from '../utils/tokens-wrapper';

type Options = {
    eventTypes: NftEventType[];
    inPrecondition: boolean;
};

export const expressionAutocompletion = (
    slice: string,
    scanResult: ScanResult,
    variables: VariableCompletions,
    options: Options,
): Completion[] | null => {
    const tokens = TokensWrapper.fromTokens(scanResult.tokens).getAllBefore(TokenType.BLOCK);
    const constants = tokens.filter((tk) => tk.type === TokenType.CONSTANT).map((tk) => tk.lexeme);
    const constantCompletions = options.inPrecondition ? [] : variables.getConstantCompletions(constants);
    const result = [...constantCompletions, ...variables.getForTriggers(options.eventTypes)];
    return result.length > 0 ? result : null;
};
