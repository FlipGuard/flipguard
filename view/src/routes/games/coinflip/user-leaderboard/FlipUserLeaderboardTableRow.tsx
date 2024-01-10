import { formatNumberForUi } from '@flipguard/commons';
import { FlippingGuildLeaderboardType } from '@flipguard/webapp-api';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { Box, Typography } from '@mui/material';
import React from 'react';

import { FadingTooltip } from '../../../../components/atoms/feedback/tooltip/FadingTooltip';
import { CustomTableCell } from '../../../../components/molecules/table/CustomTable';
import { TokenIcons } from '../../../../config/constants/tokens';
import { FlipFeedUserAvatar } from '../components/FlipFeedUserAvatar';
import { FlipUserLeaderboardTableRowContext, FlipUserLeaderboardTableRowData } from './Virtuoso';

type Props = {
    row: FlipUserLeaderboardTableRowData;
    ctx: FlipUserLeaderboardTableRowContext;
};

export const FlipUserLeaderboardTableRow = ({ row, ctx: { leaderboardType } }: Props) => {
    const tokenIcon = TokenIcons[row.token];

    return (
        <>
            <CustomTableCell sx={{ paddingLeft: '12px', width: '10%' }}>
                {row.winner ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '-2px' }}>
                        <FadingTooltip title={'Winner'}>
                            <EmojiEventsOutlinedIcon sx={{ fontSize: '22px' }} />
                        </FadingTooltip>
                    </Box>
                ) : (
                    <Typography>{row.top + '.'}</Typography>
                )}
            </CustomTableCell>
            <CustomTableCell sx={{ width: '40%', maxWidth: '200px', height: '50px' }}>
                <FlipFeedUserAvatar userId={row.userId} withUsername={true} />
            </CustomTableCell>
            <CustomTableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
                    <Typography>{formatNumberForUi(row.volume)}</Typography>
                    {leaderboardType !== FlippingGuildLeaderboardType.TOTAL_FLIPS &&
                        (tokenIcon ? (
                            <img
                                alt={row.token}
                                src={tokenIcon}
                                style={{ width: '20px', height: '20px', marginLeft: '6px' }}
                            />
                        ) : (
                            <Typography sx={{ marginLeft: '6px' }}>{row.token}</Typography>
                        ))}
                </Box>
            </CustomTableCell>
            <CustomTableCell sx={{ width: '10%', color: '#999' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '20%' }}>
                    <Typography>{row.winChance ? row.winChance : row.flips}</Typography>
                </Box>
            </CustomTableCell>
        </>
    );
};
