import { Box, Link, styled, Typography } from '@mui/material';
import React from 'react';

const Paragraph = styled(Typography)({
    margin: 0,
    fontSize: '14px',
    fontFamily: 'inherit',
    display: 'inline',
});

const MultilineCode = styled(Box)({
    backgroundColor: '#202225 !important',
    padding: '6px !important',
    borderRadius: '4px !important',
    width: '100%',
    display: 'block',
    marginTop: '2px',
});

const Code = styled(Box)({
    backgroundColor: '#202225 !important',
    padding: '1px 4px !important',
    borderRadius: '4px !important',
    display: 'inline',
    whiteSpace: 'pre-wrap',
});

const multilineCodeBlockRegex = /```(\n)?[\s\S]+?```/;
const inlineCodeRegex = /`.+?`/;
const customIconRegex = /<a?:\w+:(\d+)>/;
const linkRegex = /\[([\w\s()*_~.]+)]\(([\w:./?\-=#]+)\)/;
const boldItalicRegex = /\*\*\*.+?\*\*\*/;
const boldRegex = /\*\*.+?\*\*/;
const italicRegex = /\*.+?\*/;
const strikethroughRegex = /~~.+?~~/;
const underlineRegex = /__.+?__/;

type Props = {
    children: string;
};

export const DiscordMarkdown = ({ children }: Props) => {
    return <Box>{parseMultiline(children)}</Box>;
};

const parseMultiline = (text: string): JSX.Element | JSX.Element[] => {
    const match = text.match(multilineCodeBlockRegex);
    if (match) {
        const numOfTicks = 3;
        const offsetStart = numOfTicks + (match[1]?.length ?? 0);
        const fullText = match[0];
        const offsetEnd = numOfTicks + (fullText[fullText.length - 1 - numOfTicks] === '\n' ? 1 : 0);
        return (
            <>
                {parseMultiline(left(match))}
                <Box component={'pre'} sx={{ display: 'inline', marginTop: '4px' }}>
                    <MultilineCode component={'code'}>
                        {match[0].substring(offsetStart, match[0].length - offsetEnd)}
                    </MultilineCode>
                </Box>
                {parseMultiline(right(match))}
            </>
        );
    }

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

    let match = line.match(linkRegex);
    if (match) {
        return (
            <>
                {parse(left(match))}
                <Link target={'_blank'} href={match[2]} sx={{ color: '#00aff4', textDecorationColor: 'transparent' }}>
                    {parse(match[1])}
                </Link>
                {parse(right(match))}
            </>
        );
    }

    match = line.match(inlineCodeRegex);
    if (match) {
        return (
            <>
                {parse(left(match))}
                <Code component={'code'}>{match[0].substring(1, match[0].length - 1)}</Code>
                {parse(right(match))}
            </>
        );
    }

    match = line.match(boldItalicRegex);
    if (match) {
        return (
            <>
                {parse(left(match))}
                <Paragraph sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#fff' }}>
                    {match[0].substring(3, match[0].length - 3)}
                </Paragraph>
                {parse(right(match))}
            </>
        );
    }

    match = line.match(boldRegex);
    if (match) {
        return (
            <>
                {parse(left(match))}
                <Paragraph sx={{ fontWeight: 'bold', color: '#fff' }}>
                    {match[0].substring(2, match[0].length - 2)}
                </Paragraph>
                {parse(right(match))}
            </>
        );
    }

    match = line.match(italicRegex);
    if (match) {
        return (
            <>
                {parse(left(match))}
                <Paragraph sx={{ fontStyle: 'italic' }}>{match[0].substring(1, match[0].length - 1)}</Paragraph>
                {parse(right(match))}
            </>
        );
    }

    match = line.match(strikethroughRegex);
    if (match) {
        return (
            <>
                {parse(left(match))}
                <Paragraph sx={{ textDecoration: 'line-through' }}>
                    {match[0].substring(2, match[0].length - 2)}
                </Paragraph>
                {parse(right(match))}
            </>
        );
    }

    match = line.match(underlineRegex);
    if (match) {
        return (
            <>
                {parse(left(match))}
                <Paragraph sx={{ textDecoration: 'underline' }}>{match[0].substring(2, match[0].length - 2)}</Paragraph>
                {parse(right(match))}
            </>
        );
    }

    match = line.match(customIconRegex);
    if (match) {
        const iconId = match[1];
        return (
            <>
                {parse(left(match))}
                <DiscordIcon id={iconId} />
                {parse(right(match))}
            </>
        );
    }

    return <Paragraph>{line}</Paragraph>;
};

const left = (match: RegExpMatchArray): string => {
    return match.input?.substring(0, match.index) ?? '';
};

const right = (match: RegExpMatchArray): string => {
    return match.input?.substring(match[0].length + (match.index as number)) ?? '';
};

export const DiscordTitleMarkdown = ({ children }: { children: string }) => {
    return <Box>{parseCustomIcon(children)}</Box>;
};

const parseCustomIcon = (line: string): string | JSX.Element => {
    const match = line.match(customIconRegex);
    if (match) {
        const iconId = match[1];
        return (
            <>
                {parseCustomIcon(left(match))}
                <DiscordIcon id={iconId} />
                {parseCustomIcon(right(match))}
            </>
        );
    }

    return line;
};

const DiscordIcon = ({ id }: { id: string }) => {
    return (
        <img
            width={18}
            height={18}
            style={{ marginBottom: '-2px' }}
            src={`https://cdn.discordapp.com/emojis/${id}`}
            alt={'icon'}
        />
    );
};
