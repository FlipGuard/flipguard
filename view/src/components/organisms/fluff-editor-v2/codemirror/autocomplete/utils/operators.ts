import { Token, TokenType } from '@flipguard/webapp-fluff-api';

export const isComparisonOperator = (token: Token) => {
    return (
        token.type === TokenType.LESS ||
        token.type === TokenType.LESS_EQUAL ||
        token.type === TokenType.BANG_EQUAL ||
        token.type === TokenType.EQUAL_EQUAL ||
        token.type === TokenType.GREATER_EQUAL ||
        token.type === TokenType.GREATER ||
        token.type === TokenType.IN ||
        token.type === TokenType.NOT_IN ||
        token.type === TokenType.FALSE ||
        token.type === TokenType.TRUE
    );
};
