import { formatNumberForUi } from '@flipguard/commons';
import { FlipBotGlobalGuildConfigGetDto, FlippingRoomDto } from '@flipguard/webapp-api';
import { Box, Card, Divider, styled, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { CoinFlipQueryKeys, getRoomWinChance } from '../../../api/requests/coinflip';
import { DiscordServerIcon } from '../../../components/atoms/data-display/DiscordServerIcon';
import { CustomAccordion } from '../../../components/atoms/surfaces/accordion/CustomAccordion';
import { TokenIcons } from '../../../config/constants/tokens';
import { FeesSummary } from './components/FeesSummary';

const FLIPPING_ROOM_DESCRIPTION = `
    Flipping rooms are linked to a projects Discord server and include custom fee roles configured by the project's team. 
    They also act as a hub for community specific events. 
`;

const FLIPPING_ODDS_DESCRIPTION = `
    Flipping odds are set to 50:50 by default, but a project's team can activate dynamic odds to balance between 51:49 and 49:51.
`;

const FLIPPING_DISCORD_DESCRIPTION = `
    Because we're linked to Discord, you can access a variety of useful commands directly from your community's Discord server via FlipSuite. 
    Simply go to a channel where FlipSuite commands are allowed and use the /start command for an overview. 
    You can also view other useful commands like in-Discord leaderboards, server FlipSuite stats and more.
`;

const Container = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
});

type Props = {
    flippingRoom: FlippingRoomDto;
    verifiedCommunities: Record<string, FlipBotGlobalGuildConfigGetDto>;
};

export const RoomFlippingCard = ({ flippingRoom, verifiedCommunities }: Props) => {
    const guildId = flippingRoom.roomId;
    const guild = verifiedCommunities[guildId];

    const { data: winChance = 0.5 } = useQuery(
        CoinFlipQueryKeys.roomWinChance(guildId),
        () => getRoomWinChance(guildId),
        {
            enabled: !!guild,
        },
    );

    if (!guild) {
        return null;
    }

    return (
        <Container>
            <Box sx={{ display: 'flex', alignItems: 'center', margin: '4px 8px 8px 8px' }}>
                <DiscordServerIcon
                    guildId={guild.guildId}
                    icon={guild.icon}
                    sx={{
                        fontSize: '22px',
                        width: '40px',
                        height: '40px',
                        marginRight: '8px',
                    }}
                />
                <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontWeight: 400, fontSize: '24px', marginTop: '-4px' }}>{guild.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: '#999', fontSize: '13px', marginTop: '-6px' }}>
                            Community Flipping Room
                        </Typography>
                        <Typography sx={{ color: '#999', fontSize: '13px', marginTop: '-6px' }}>
                            {`${formatNumberForUi(winChance * 100)}% win chance`}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Typography sx={{ margin: '14px 8px 4px 8px', fontWeight: 400, fontSize: '18px' }}>Fees</Typography>
            <Divider sx={{ margin: '0 8px 2px 8px' }} />
            <Box sx={{ margin: '8px' }}>
                <FeesSummary flippingRoom={flippingRoom} />
            </Box>
            {flippingRoom.defaultErc20Fee > 0 && (
                <Box
                    sx={{
                        margin: '0 8px 4px 8px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Typography
                        sx={{ marginLeft: '6px', fontSize: '13px' }}
                    >{`+ ${flippingRoom.defaultErc20Fee}`}</Typography>
                    <img
                        alt={'matic'}
                        src={TokenIcons['MATIC']}
                        style={{ width: '18px', height: '18px', margin: '0 6px' }}
                    />
                    <Typography sx={{ color: '#fff', fontSize: '13px' }}>for every ERC-20 flip</Typography>
                </Box>
            )}
            <Typography sx={{ margin: '14px 8px 4px 8px', fontWeight: 400, fontSize: '18px' }}>FAQ</Typography>
            <CustomAccordion label={'How do community flipping rooms work?'} sx={{ margin: '8px' }}>
                <Typography sx={{ fontSize: '14px', paddingBottom: '12px' }}>{FLIPPING_ROOM_DESCRIPTION}</Typography>
            </CustomAccordion>
            <CustomAccordion label={'What are my chances of winning?'} sx={{ margin: '8px' }}>
                <Typography sx={{ fontSize: '14px', paddingBottom: '12px' }}>{FLIPPING_ODDS_DESCRIPTION}</Typography>
            </CustomAccordion>
            <CustomAccordion
                label={'What is FlipSuite’s role in community rooms?'}
                sx={{ margin: '8px', marginBottom: '8px !important' }}
            >
                <Typography sx={{ fontSize: '14px', paddingBottom: '12px' }}>{FLIPPING_DISCORD_DESCRIPTION}</Typography>
            </CustomAccordion>
        </Container>
    );
};
