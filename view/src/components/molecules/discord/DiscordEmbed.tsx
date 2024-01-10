import { DiscordEmbedFieldTemplate } from '@flipguard/webapp-api';
import { Box, BoxProps, styled } from '@mui/material';
import {
    DiscordEmbed as SkyraDiscordEmbed,
    DiscordEmbedDescription,
    DiscordEmbedFields,
    DiscordEmbedFooter,
} from '@skyra/discord-components-react';
import React from 'react';

import { CustomDiscordEmbedField } from './CustomDiscordEmbedField';
import { DiscordFooterImage } from './DiscordFooterImage';
import { DiscordMarkdown } from './DiscordMarkdown';

const CustomDiscordEmbed = styled(SkyraDiscordEmbed, {
    shouldForwardProp: (prop) => prop !== 'color',
})(({ color }) => ({
    fontFamily: "'Open Sans', sans-serif",
    overflowWrap: 'break-word',
    '& .discord-embed-media, & .discord-embed-title, & .discord-embed-description, & .discord-embed-fields': {
        gridColumn: '1 / span 2',
    },
    '& .discord-embed-title a, .discord-embed-author a': {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    '& .discord-left-border': {
        background:
            color !== 'Random'
                ? color
                : 'linear-gradient(180deg, ' +
                  'rgba(255,0,0,1) 0%, ' +
                  'rgba(255,154,0,1) 10%, ' +
                  'rgba(208,222,33,1) 20%, ' +
                  'rgba(79,220,74,1) 30%, ' +
                  'rgba(63,218,216,1) 40%, ' +
                  'rgba(47,201,226,1) 50%, ' +
                  'rgba(28,127,238,1) 60%, ' +
                  'rgba(95,21,242,1) 70%, ' +
                  'rgba(186,12,248,1) 80%, ' +
                  'rgba(251,7,217,1) 90%, ' +
                  'rgba(255,0,0,1) 100%);',
    },
}));

type Props = BoxProps & {
    leftBorderColor: string;
    authorName?: string;
    authorImageUrl?: string;
    authorUrl?: string;
    title: string;
    titleUrl?: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    description: string;
    fields: DiscordEmbedFieldTemplate[];
    footer: string;
    footerImageUrl?: string;
    hideTimestamp?: boolean;
};

export const DiscordEmbed = (props: Props) => {
    const {
        leftBorderColor,
        authorName,
        authorImageUrl,
        authorUrl,
        title,
        titleUrl,
        imageUrl,
        thumbnailUrl,
        description,
        fields,
        footer,
        footerImageUrl,
        hideTimestamp,
        sx: sxProps,
        ...restProps
    } = props;

    const countInlineIdxs = () => {
        const res = [];
        let tmp = 0;
        for (const field of fields) {
            if (!field.inline) {
                res.push(-1);
                tmp = 0;
            } else {
                res.push(tmp % 3);
                tmp++;
            }
        }
        return res;
    };

    const inlineIdxs = countInlineIdxs();

    return (
        <Box sx={{ backgroundColor: 'transparent', ...sxProps }} {...restProps}>
            <CustomDiscordEmbed
                slot="embeds"
                color={leftBorderColor}
                embedTitle={title}
                url={titleUrl}
                image={imageUrl}
                thumbnail={thumbnailUrl}
                authorName={authorName}
                authorImage={authorImageUrl}
                authorUrl={authorUrl}
            >
                <DiscordEmbedDescription slot="description">
                    <DiscordMarkdown>{description.trimEnd()}</DiscordMarkdown>
                </DiscordEmbedDescription>
                <DiscordEmbedFields slot="fields">
                    {fields.map((field, idx) => (
                        <CustomDiscordEmbedField
                            key={idx}
                            inlineIdx={inlineIdxs[idx]}
                            title={field.name}
                            value={field.value}
                            inline={field.inline}
                        />
                    ))}
                </DiscordEmbedFields>
                <DiscordEmbedFooter slot="footer" timestamp={!hideTimestamp ? new Date() : undefined}>
                    {footerImageUrl && <DiscordFooterImage src={footerImageUrl} />}
                    {footer}
                </DiscordEmbedFooter>
            </CustomDiscordEmbed>
        </Box>
    );
};
