import { Box, styled } from '@mui/material';
import { DiscordMessage, DiscordMessages } from '@skyra/discord-components-react';
import React from 'react';

import FlipBotLogo from '../../assets/flipbot-logo.png';
import isViewMobile from '../../hooks/utils/isViewMobile';
import { SnipedNftPreview } from './SnipedNftPreview';
import { SoldNftPreview } from './SoldNftPreview';

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

export const AlertsPreview = () => {
    const isMobile = isViewMobile('sm');

    const snipe = (
        <SnipedNftPreview
            name={'The Herd #2579'}
            collection={'The Herd'}
            price={'22 MATIC'}
            transaction={'0xc18b10fcd438c294bca13a224cb356f5baaab282a5c66d4ce5ea4f69f36faf31'}
            image={'https://i.seadn.io/gcs/files/6461c5e6845bf5e9227a8d93ec9a852f.png?w=500&auto=format'}
        />
    );

    const sale = (
        <SoldNftPreview
            name={'The Herd #2579'}
            collection={'The Herd'}
            price={'300 MATIC'}
            value={'$210'}
            image={'https://i.seadn.io/gcs/files/6461c5e6845bf5e9227a8d93ec9a852f.png?w=500&auto=format'}
        />
    );

    if (isMobile) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {snipe}
                {sale}
            </Box>
        );
    }

    return (
        <CustomDiscordMessages sx={{ maxWidth: '460px' }}>
            <CustomDiscordMessage author={'FlipAlerts'} bot={true} avatar={FlipBotLogo}>
                {snipe}
            </CustomDiscordMessage>
            <CustomDiscordMessage author={'FlipAlerts'} bot={true} avatar={FlipBotLogo}>
                {sale}
            </CustomDiscordMessage>
        </CustomDiscordMessages>
    );
};
