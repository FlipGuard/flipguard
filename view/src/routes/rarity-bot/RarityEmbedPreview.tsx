import { styled } from '@mui/material';
import { DiscordMessage, DiscordMessages, DiscordReply } from '@skyra/discord-components-react';
import React from 'react';

import FlipBotLogo from '../../assets/flipbot-logo.png';
import { DiscordEmbed } from '../../components/molecules/discord/DiscordEmbed';
import isViewMobile from '../../hooks/utils/isViewMobile';

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

const CustomReply = styled(DiscordReply)({
    '&:hover, & span:hover': {
        cursor: 'default',
    },
});

export const RarityLevel = {
    Mythic: { name: 'Mythic', icon: '🔴', color: '#ea1c1c' },
    Legendary: { name: 'Legendary', icon: '🟠', color: '#ef9217' },
    Epic: { name: 'Epic', icon: '🟣', color: '#b562f1' },
    Rare: { name: 'Rare', icon: '🔵', color: '#1e91e1' },
    Uncommon: { name: 'Uncommon', icon: '🟢', color: '#23a915' },
    Common: { name: 'Common', icon: '⚪', color: '#d2d2d2' },
} as const;

export type RarityLevel = (typeof RarityLevel)[keyof typeof RarityLevel];

type Props = {
    collectionName: string;
    collectionAddress: string;
    tokenId: string;
    tokenName: string;
    supply: number;
    imageUrl: string;
    rank: number;
    top: number;
    level: RarityLevel;
};

export const RarityEmbedPreview = ({
    collectionName,
    collectionAddress,
    tokenId,
    tokenName,
    supply,
    imageUrl,
    rank,
    top,
    level,
}: Props) => {
    const isMobile = isViewMobile('sm');
    const timestamp = 'Today at ' + new Date().toLocaleTimeString('en', { timeStyle: 'short' });

    const embed = (
        <DiscordEmbed
            leftBorderColor={level.color}
            title={tokenName}
            titleUrl={`https://opensea.io/assets/matic/${collectionAddress}/${tokenId}`}
            description={''}
            imageUrl={imageUrl}
            fields={[
                {
                    name: 'Collection',
                    value: collectionName,
                    inline: true,
                },
                {
                    name: 'Supply',
                    value: '' + supply,
                    inline: true,
                },
                {
                    name: 'Token ID',
                    value: tokenId,
                    inline: true,
                },
                {
                    name: 'Rank',
                    value: `💎 ${rank}`,
                    inline: true,
                },
                {
                    name: 'Top',
                    value: `💎 ${top}%`,
                    inline: true,
                },
                {
                    name: 'Rarity level',
                    value: `${level.icon} ${level.name}`,
                    inline: true,
                },
            ]}
            footer={'Powered by flipguard.xyz'}
            footerImageUrl={FlipBotLogo}
            hideTimestamp={true}
        />
    );

    if (isMobile) {
        return embed;
    }

    return (
        <CustomDiscordMessages sx={{ maxWidth: '460px' }}>
            <CustomDiscordMessage author={'FlipRarity'} bot={true} timestamp={timestamp} avatar={FlipBotLogo}>
                <CustomReply slot={'reply'} author={'Someone'}>
                    <span style={{ color: '#aaa' }}>used</span>
                    <span style={{ marginLeft: '4px', color: '#2b92d0', fontWeight: 500 }}>/rarity</span>
                </CustomReply>
                {embed}
            </CustomDiscordMessage>
        </CustomDiscordMessages>
    );
};
