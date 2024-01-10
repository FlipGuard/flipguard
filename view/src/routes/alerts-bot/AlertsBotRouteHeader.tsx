import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { Box, Typography } from '@mui/material';
import React from 'react';

import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import isViewMobile from '../../hooks/utils/isViewMobile';

const DESCRIPTION = 'Get notified about your NFT sales/snipes in real-time';

export const AlertsBotRouteHeader = () => {
    const isMobile = isViewMobile();

    return (
        <>
            {isMobile && <Typography>{DESCRIPTION}</Typography>}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    placeContent: 'flex-end',
                    marginTop: isMobile ? '24px' : '16px',
                }}
            >
                {!isMobile && <Typography sx={{ marginBottom: '16px' }}>{DESCRIPTION}</Typography>}
                <Typography sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: isMobile ? 0 : '16px' }}>
                    <PrimaryButton
                        icon={ArticleOutlinedIcon}
                        onClick={() =>
                            window.open('https://wiki.flipguard.xyz/flipguard-wiki-wip/discord-bots/alerts-bot')
                        }
                    >
                        Setup Guide
                        <ArrowOutwardOutlinedIcon sx={{ fontSize: '15px', margin: '-4px 0 0 4px' }} />
                    </PrimaryButton>
                </Box>
            </Box>
        </>
    );
};
