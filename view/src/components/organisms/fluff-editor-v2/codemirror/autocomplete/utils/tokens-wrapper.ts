import { CompletionContext } from '@codemirror/autocomplete';
import { NftEventType } from '@flipguard/domain';
import { Fluff } from '@flipguard/webapp-fluff';
import { Token, TokenType } from '@flipguard/webapp-fluff-api';

import { isComparisonOperator } from './operators';
import { EXPRESSION_TOKEN_TYPES, VALUE_TOKEN_TYPES } from './tokens';

export class TokensWrapper {
    public constructor(
        private left: Token[],
        private right: Token[],
    ) {}

    public static fromTokens = (tokens: Token[]) => {
        return new TokensWrapper(tokens, []);
    };

    public static fromContext = (context: CompletionContext) => {
        const { tokens: left } = Fluff.scan(context.state.sliceDoc(0, context.pos));
        const { tokens: right } = Fluff.scan(context.state.sliceDoc(context.pos));
        return new TokensWrapper(left, right);
    };

    public removeLast = () => {
        this.left = [...this.left.slice(0, this.left.length - 2), this.eof()];
    };

    public unsafeAt = (idx: number): Token => {
        return this.at(idx) as Token;
    };

    public at = (idx: number): Token | undefined => {
        // Ignore EOF
        const start = idx < 0 ? this.left.length - 1 : 0;
        return this.left[start + idx];
    };

    public eof = (): Token => {
        return this.left[this.left.length - 1] as Token;
    };

    public endsOnComparisonOperator = () => {
        return this.at(-2)?.type === TokenType.IDENTIFIER && isComparisonOperator(this.unsafeAt(-1));
    };

    public endsOnValue = () => {
        return (
            this.endsOn([EXPRESSION_TOKEN_TYPES, VALUE_TOKEN_TYPES]) || this.endsOn([[TokenType.FALSE, TokenType.TRUE]])
        );
    };

    public before = (type: TokenType) => {
        return this.right[0]?.type === type;
    };

    public getAllBefore = (...types: TokenType[]) => {
        let lastIdx = -1;
        for (let i = this.left.length - 1; i >= 0; i--) {
            if (types.includes(this.left[i].type)) {
                lastIdx = i;
                break;
            }
        }

        return this.left.slice(0, lastIdx + 1);
    };

    public endsOn = (pattern: TokenType[][]) => {
        return this.endsOnWithSkip(pattern)[0];
    };

    public endsOnWithSkip = (pattern: TokenType[][], ...skip: TokenType[]): [boolean, Token[]] => {
        const skipped: Token[] = [];
        const filtered: Token[] = [];

        this.left.forEach((tk) => {
            if (!skip.includes(tk.type)) {
                filtered.push(tk);
            } else {
                skipped.push(tk);
            }
        });

        const offset = filtered.length - 1 - pattern.length;
        if (offset < 0) {
            return [false, skipped];
        }

        const result = pattern.every((types, idx) => types.includes(filtered[offset + idx].type));
        return [result, skipped];
    };

    public endsInsideSwitchCase = () => {
        const tokens = this.left.filter((tk) => !this.isExpressionToken(tk));
        return tokens[tokens.length - 2]?.type === TokenType.CASE;
    };

    private isExpressionToken = ({ type }: Token) => {
        return EXPRESSION_TOKEN_TYPES.includes(type);
    };

    public endsOnConditionalExpression = () => {
        const [, startIdx] = this.findLast(TokenType.CASE, TokenType.BLOCK);
        if (startIdx === -1) {
            return false;
        }

        let result = false;
        for (let i = startIdx; i < this.left.length && !result; i++) {
            const tk = this.left[i];
            result = isComparisonOperator(tk);
        }

        return result;
    };

    public findLast = (...types: TokenType[]): [Token | undefined, number] => {
        for (let i = this.left.length - 1; i >= 0; i--) {
            const tk = this.left[i];
            if (types.includes(tk.type)) {
                return [tk, i];
            }
        }

        return [undefined, -1];
    };

    public inferTrigger = (): NftEventType | undefined => {
        for (let i = 0; i < this.left.length - 1; i++) {
            const [curr, next] = [this.left[i], this.left[i + 1]];
            const isTrigger = curr.type === TokenType.BLOCK && curr.lexeme === 'trigger:';
            if (isTrigger && next.type === TokenType.STRING) {
                switch (next.literal) {
                    case 'listing':
                        return NftEventType.Listing;
                    case 'sale':
                        return NftEventType.Sale;
                    case 'sale/sniped':
                        return NftEventType.AutobuySale;
                    default:
                        return undefined;
                }
            }
        }
    };

    public inferNextExtensionName = (): string => {
        for (let i = 0; i < this.right.length - 1; i++) {
            const [curr, next] = [this.right[i], this.right[i + 1]];
            if (curr.type === TokenType.FROM && next.type === TokenType.STRING) {
                return next.literal;
            }

            if (curr.type === TokenType.DEF || curr.type === TokenType.BLOCK) {
                break;
            }
        }

        return '';
    };
}
