import { Box, Link, styled, Typography, TypographyProps } from '@mui/material';
import React, { ComponentType } from 'react';

const hashtagRegex = /#\w+/;
const dollarTagRegex = /\$[a-zA-Z]+/;
const handleRegex = /@\w+/;
const linkRegex = /https?:\/\/[^ ]+/;

const CustomLink = styled(Link)({
    color: '#00aff4',
    textDecorationColor: 'transparent',
    '&:hover': {
        cursor: 'pointer',
    },
});

export const TwitterText = styled(Typography)({
    fontWeight: 400,
    fontFamily: '"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
}) as ComponentType<TypographyProps>;

export const TweetMarkdown = ({ children }: { children: string }) => {
    return <Box>{parseMultiline(children)}</Box>;
};

const parseMultiline = (text: string): JSX.Element | JSX.Element[] => {
    const lines = text.split('\n');
    return lines.map((line, idx) => (
        <React.Fragment key={idx}>
            {parse(line)}
            {idx !== lines.length - 1 ? <br /> : null}
        </React.Fragment>
    ));
};

const parse = (line: string): JSX.Element | null => {
    if (line === '') {
        return null;
    }

    let match = line.match(hashtagRegex);
    match ??= line.match(dollarTagRegex);
    match ??= line.match(handleRegex);
    if (match) {
        return (
            <>
                {parse(left(match))}
                <CustomLink>{match[0]}</CustomLink>
                {parse(right(match))}
            </>
        );
    }

    match = line.match(linkRegex);
    if (match) {
        return (
            <>
                {parse(left(match))}
                <CustomLink href={match[0].trim()} target={'_blank'} rel={'noreferrer'}>
                    {match[0]}
                </CustomLink>
                {parse(right(match))}
            </>
        );
    }

    return <TwitterText sx={{ display: 'inline' }}>{line}</TwitterText>;
};

const left = (match: RegExpMatchArray): string => {
    return match.input?.substring(0, match.index) ?? '';
};

const right = (match: RegExpMatchArray): string => {
    return match.input?.substring(match[0].length + (match.index as number)) ?? '';
};
