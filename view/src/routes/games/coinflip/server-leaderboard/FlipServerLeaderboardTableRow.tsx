import { formatNumberForUi } from '@flipguard/commons';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'wouter';

import { DiscordServerIcon } from '../../../../components/atoms/data-display/DiscordServerIcon';
import { FadingTooltip } from '../../../../components/atoms/feedback/tooltip/FadingTooltip';
import { CustomTableCell } from '../../../../components/molecules/table/CustomTable';
import { RoutePath } from '../../../../config/constants/navigation';
import { TokenIcons } from '../../../../config/constants/tokens';
import { FlipServerLeaderboardTableRowContext, FlipServerLeaderboardTableRowData } from './Virtuoso';

type Props = {
    row: FlipServerLeaderboardTableRowData;
    ctx: FlipServerLeaderboardTableRowContext;
};

export const FlipServerLeaderboardTableRow = ({ row, ctx: { communities } }: Props) => {
    const [, setLocation] = useLocation();

    const guild = communities[row.roomId];

    const tokenIcon = TokenIcons[row.token];

    return (
        <>
            <CustomTableCell sx={{ paddingLeft: '12px', width: '10%' }}>{row.top}</CustomTableCell>
            <CustomTableCell sx={{ width: '40%', maxWidth: '200px', height: '50px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FadingTooltip title={guild.name} placement={'top'}>
                        <span>
                            <DiscordServerIcon
                                onClick={() => setLocation(`${RoutePath.Explore}/${guild.guildId}`)}
                                guildId={guild.guildId}
                                icon={guild.icon}
                                sx={{
                                    width: '28px',
                                    height: '28px',
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                            />
                        </span>
                    </FadingTooltip>
                    <Typography sx={{ marginLeft: '12px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {guild.name}
                    </Typography>
                </Box>
            </CustomTableCell>
            <CustomTableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
                    <Typography>{formatNumberForUi(row.volume)}</Typography>
                    {tokenIcon ? (
                        <img
                            alt={row.token}
                            src={tokenIcon}
                            style={{ width: '20px', height: '20px', marginLeft: '6px' }}
                        />
                    ) : (
                        <Typography sx={{ marginLeft: '6px' }}>{row.token}</Typography>
                    )}
                </Box>
            </CustomTableCell>
            <CustomTableCell sx={{ width: '15%', color: '#999' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '20%' }}>
                    <Typography>{formatNumberForUi(row.flips)}</Typography>
                </Box>
            </CustomTableCell>
        </>
    );
};
