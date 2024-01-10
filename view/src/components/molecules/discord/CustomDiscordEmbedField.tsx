import { Box } from '@mui/material';

import { DiscordMarkdown, DiscordTitleMarkdown } from './DiscordMarkdown';

type Props = {
    title: string;
    value: string;
    inline: boolean;
    inlineIdx: number;
};

export const CustomDiscordEmbedField = ({ title, value, inline, inlineIdx }: Props) => {
    return (
        <Box
            sx={{
                fontSize: '0.875rem',
                lineHeight: '1.125rem',
                minWidth: '0',
                fontWeight: '400',
                gridColumn: '1/13',
                ...(inline && {
                    flexGrow: '1',
                    flexBasis: 'auto',
                    gridColumn: getGridColumnForIdx(inlineIdx),
                }),
            }}
        >
            <Box
                sx={{
                    color: '#fff',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    lineHeight: '1.125rem',
                    minWidth: '0',
                    marginBottom: '2px',
                }}
            >
                <DiscordTitleMarkdown>{title}</DiscordTitleMarkdown>
            </Box>
            <Box
                sx={{
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-line',
                }}
            >
                <DiscordMarkdown>{value}</DiscordMarkdown>
            </Box>
        </Box>
    );
};

const getGridColumnForIdx = (inlineIdx: number) => {
    switch (inlineIdx) {
        case 1:
            return '5/9 !important';
        case 2:
            return '9/13 !important';
        default:
            return '1/5 !important';
    }
};
