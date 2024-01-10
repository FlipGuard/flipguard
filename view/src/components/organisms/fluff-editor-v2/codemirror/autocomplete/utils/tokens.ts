import { TokenType } from '@flipguard/webapp-fluff-api';

export const EXPRESSION_TOKEN_TYPES: TokenType[] = [
    TokenType.STRING,
    TokenType.NUMBER,
    TokenType.LIST,
    TokenType.FALSE,
    TokenType.TRUE,
    TokenType.TOKEN_PRICE,
    TokenType.USD_PRICE,
    TokenType.IDENTIFIER,
    TokenType.PLUS,
    TokenType.MINUS,
    TokenType.STAR,
    TokenType.SLASH,
    TokenType.LESS,
    TokenType.LESS_EQUAL,
    TokenType.EQUAL_EQUAL,
    TokenType.BANG_EQUAL,
    TokenType.GREATER_EQUAL,
    TokenType.GREATER,
    TokenType.IN,
    TokenType.NOT_IN,
];

export const VALUE_TOKEN_TYPES: TokenType[] = [
    TokenType.STRING,
    TokenType.NUMBER,
    TokenType.LIST,
    TokenType.FALSE,
    TokenType.TRUE,
    TokenType.TOKEN_PRICE,
    TokenType.USD_PRICE,
    TokenType.IDENTIFIER,
];
