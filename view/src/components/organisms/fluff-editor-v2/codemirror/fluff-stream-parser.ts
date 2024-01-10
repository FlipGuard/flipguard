import { CompletionContext } from '@codemirror/autocomplete';
import { StreamParser, StringStream } from '@codemirror/language';
import { Fluff } from '@flipguard/webapp-fluff';
import { TokenType } from '@flipguard/webapp-fluff-api';

type State = {
    indent: number;
    inDict: boolean;
    inList: boolean;
    afterDef: boolean;
    afterUse: boolean;
    insideBlock: boolean;
    knownConstants: string[];
    nextConstantToPush?: string;
};

type Config = {
    autocompleteFn: (context: CompletionContext) => unknown;
};

export class FluffStreamParserV2 implements StreamParser<State> {
    public readonly languageData: { [name: string]: unknown };

    public constructor({ autocompleteFn }: Config) {
        this.languageData = {
            autocomplete: autocompleteFn,
            closeBrackets: { brackets: ['(', '[', '{', '"'] },
        };
    }

    public startState = (): State => {
        return {
            indent: 0,
            inDict: false,
            inList: false,
            afterDef: false,
            afterUse: false,
            insideBlock: false,
            knownConstants: [],
        };
    };

    public copyState = (state: State): State => {
        return state;
    };

    public blankLine = (state: State) => {
        return {
            ...state,
            indent: 0,
        };
    };

    public indent = (state: State): number | null => {
        return state.inList || state.inDict ? state.indent + 4 : state.indent;
    };

    public token = (stream: StringStream, state: State): string | null => {
        const input = stream.string.substring(stream.pos).trim();

        // Comment
        if (input.startsWith('#')) {
            stream.eatWhile((ch) => ch !== '\n');
            return 'comment';
        }

        const { tokens, errors } = Fluff.scan(input, 16);
        const token = tokens[0];

        if (errors.length > 0 && errors[0].message.startsWith('Unexpected character')) {
            stream.next();
            return null;
        }

        if (token.type === TokenType.EOF) {
            stream.next();
            return null;
        }

        // Multiline LIST
        if (token.type === TokenType.LIST || token.type === TokenType.LEFT_BRACKET) {
            stream.eatWhile(/[^[]/);
            stream.eat('[');
            state.inList = true;
            return null;
        } else if (token.type === TokenType.RIGHT_BRACKET) {
            stream.eatWhile(/[^\]]/);
            stream.eat(']');
            state.inList = false;
            return null;
        }

        // Multiline DICT
        if (token.type === TokenType.DICT) {
            stream.eatWhile(/[^{]/);
            stream.eat('{');
            state.inDict = true;
            return null;
        } else if (token.type === TokenType.RIGHT_BRACE) {
            stream.eatWhile(/[^}]/);
            stream.eat('}');
            state.inDict = false;
            return null;
        }

        if (token.type === TokenType.BLOCK) {
            state.afterDef = false;
            if (token.lexeme !== 'trigger:') {
                state.indent = 4;
                state.insideBlock = true;
            }
        }

        if (token.type === TokenType.DEF) {
            state.afterDef = true;
        }

        if (token.type === TokenType.USE) {
            state.afterUse = true;
        } else if (token.type === TokenType.FROM) {
            state.afterUse = false;
        }

        if ([TokenType.DEF, TokenType.DEFAULT, TokenType.BLOCK].includes(token.type) && state.nextConstantToPush) {
            state.knownConstants.push(state.nextConstantToPush);
            state.nextConstantToPush = undefined;
        }

        if (token.type === TokenType.IDENTIFIER) {
            const afterDef = state.afterDef;
            state.afterDef = false;
            if (token.lexeme.startsWith('nft.traits')) {
                stream.match(lexemeRegex('nft.traits'), true);
                return 'variable';
            } else if (afterDef && !state.insideBlock) {
                state.nextConstantToPush = token.lexeme;
                stream.match(lexemeRegex(token.lexeme), true);
                return 'attributeName';
            } else if (state.afterUse) {
                state.knownConstants.push(token.lexeme);
                stream.match(lexemeRegex(token.lexeme), true);
                return 'attributeName';
            } else if (state.knownConstants.includes(token.lexeme)) {
                stream.match(lexemeRegex(token.lexeme), true);
                return 'attributeName';
            }
        }

        if (stream.match(lexemeRegex(token.lexeme), true)) {
            // Function argument
            if (token.type === TokenType.BLOCK && state.inDict) {
                return 'variable';
            }

            switch (token.type) {
                case TokenType.AND:
                case TokenType.OR:
                case TokenType.NOT:
                case TokenType.IN:
                case TokenType.NOT_IN:
                case TokenType.FALSE:
                case TokenType.TRUE:
                case TokenType.DEF:
                case TokenType.SWITCH:
                case TokenType.CASE:
                case TokenType.DEFAULT:
                case TokenType.USE:
                case TokenType.FROM:
                    return 'keyword';
                case TokenType.LESS:
                case TokenType.LESS_EQUAL:
                case TokenType.EQUAL_EQUAL:
                case TokenType.BANG_EQUAL:
                case TokenType.GREATER_EQUAL:
                case TokenType.GREATER:
                    return 'operator';
                case TokenType.ARROW:
                    return 'controlOperator';
                case TokenType.BLOCK:
                    return 'labelName';
                case TokenType.IDENTIFIER:
                    return 'variable';
                case TokenType.NUMBER:
                case TokenType.USD_PRICE:
                case TokenType.TOKEN_PRICE:
                    return 'number';
                case TokenType.STRING:
                    return 'string';
                case TokenType.FUNCTION:
                    return 'propertyName';
                default:
                    state.afterDef = false;
                    return null;
            }
        }

        stream.next();
        return null;
    };
}

const lexemeRegex = (lexeme: string) => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    const escaped = lexeme.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`^ *${escaped}`);
};
