import { render } from '@flipguard/commons';
import { Marketplaces } from '@flipguard/domain';
import { DiscordEmbedTemplate } from '@flipguard/webapp-api';
import { BoxProps, styled } from '@mui/material';
import { DiscordMessage, DiscordMessages } from '@skyra/discord-components-react';
import React from 'react';

import FlipBotLogo from '../../../../assets/flipbot-logo.png';
import isViewMobile from '../../../../hooks/utils/isViewMobile';
import { DiscordEmbed } from '../../../molecules/discord/DiscordEmbed';
import { ExampleNft, getRandomNftExample } from '../examples/examples';

const CustomDiscordMessages = styled(DiscordMessages)({
    borderRadius: '4px',
});

const CustomDiscordMessage = styled(DiscordMessage)({
    background: 'none',
    '&:hover': {
        background: 'none',
    },
    '& .discord-message-timestamp': {
        color: '#999',
        fontWeight: 500,
    },
    '& .discord-application-tag': {
        marginLeft: '8px !important',
        paddingTop: '1px !important',
    },
});

type Props = BoxProps & {
    exampleNft?: ExampleNft;
    template: DiscordEmbedTemplate;
    asMessage?: boolean;
};

export const DiscordEmbedPreview = ({ exampleNft = getRandomNftExample(), template, asMessage, ...props }: Props) => {
    const { color, title, url, includeMedia, description, fields, footer } = template;
    const isMobile = isViewMobile();

    const marketplace = Marketplaces[exampleNft.marketplace];
    const leftBorderColor = color === 'Marketplace' ? marketplace.themeColor : color;

    const embed = (
        <DiscordEmbed
            authorName={marketplace.name}
            authorImageUrl={marketplace.iconUrl}
            authorUrl={marketplace.url}
            leftBorderColor={leftBorderColor}
            title={render(title, exampleNft.variables)}
            titleUrl={render(url ?? '', exampleNft.variables)}
            imageUrl={includeMedia ? exampleNft.imageUrl : undefined}
            description={render(description, exampleNft.variables)}
            fields={fields.map((f) => ({
                ...f,
                value: render(f.value, exampleNft.variables),
            }))}
            footer={render(footer, exampleNft.variables)}
            footerImageUrl={FlipBotLogo}
            {...props}
        />
    );

    if (asMessage && !isMobile) {
        const timestamp = 'Today at ' + new Date().toLocaleTimeString('en', { timeStyle: 'short' });

        return (
            <CustomDiscordMessages>
                <CustomDiscordMessage author={'Your Discord Bot'} bot={true} timestamp={timestamp}>
                    {embed}
                </CustomDiscordMessage>
            </CustomDiscordMessages>
        );
    } else {
        return embed;
    }
};
