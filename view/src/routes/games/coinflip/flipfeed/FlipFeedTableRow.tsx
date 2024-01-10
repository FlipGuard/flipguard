import { formatNumberForUi } from '@flipguard/commons';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'wouter';

import { DiscordServerIcon } from '../../../../components/atoms/data-display/DiscordServerIcon';
import { FadingTooltip } from '../../../../components/atoms/feedback/tooltip/FadingTooltip';
import { CustomLink } from '../../../../components/atoms/navigation/CustomLink';
import { CustomTableCell } from '../../../../components/molecules/table/CustomTable';
import { RoutePath } from '../../../../config/constants/navigation';
import { TokenIcons } from '../../../../config/constants/tokens';
import { formatTimeAgo } from '../../../../utils/timestamps';
import { FlipFeedUserAvatar } from '../components/FlipFeedUserAvatar';
import { FlipFeedTableRowContext, FlipFeedTableRowData } from './Virtuoso';

type Props = {
    row: FlipFeedTableRowData;
    ctx: FlipFeedTableRowContext;
};

export const FlipFeedTableRow = ({ row: flip, ctx: { communities } }: Props) => {
    const [, setLocation] = useLocation();

    const guild = communities[flip.guildId];

    const guildIdShort = flip.guildId.substring(flip.guildId.length - 4);

    const statusIcon = (() => {
        if (flip.pending) {
            return <CircularProgress size={24} sx={{ color: '#999', padding: '2px' }} />;
        } else if (flip.success) {
            return <CheckCircleOutlineOutlinedIcon sx={{ color: '#69d071' }} />;
        } else if (!flip.ephemeral) {
            return <HighlightOffOutlinedIcon sx={{ color: '#d25050' }} />;
        } else {
            return (
                <FadingTooltip title={flip.error} placement={'top'}>
                    <ReportProblemOutlinedIcon sx={{ color: '#e5c548' }} />
                </FadingTooltip>
            );
        }
    })();

    const tokenIcon = TokenIcons[flip.betToken];

    const betAmountFormatted = `${formatNumberForUi(flip.betAmount)} ${tokenIcon ? '' : flip.betToken}`;

    return (
        <>
            <CustomTableCell sx={{ paddingLeft: '12px', width: '15%' }}>
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    {statusIcon}
                    {flip.exp > 0 && (
                        <Box sx={{ position: 'absolute', left: 16, bottom: -8 }}>
                            <Typography sx={{ fontSize: '10px' }}>{`+${flip.exp} XP`}</Typography>
                        </Box>
                    )}
                </Box>
            </CustomTableCell>
            <CustomTableCell sx={{ width: '17%' }}>
                <FlipFeedUserAvatar userId={flip.userId} />
            </CustomTableCell>
            <CustomTableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '28%' }}>
                    <Typography sx={{ userSelect: 'none', textWrap: 'none' }}>{betAmountFormatted}</Typography>
                    {tokenIcon && (
                        <FadingTooltip title={flip.betToken}>
                            <img
                                alt={flip.betToken}
                                src={tokenIcon}
                                style={{ width: '20px', height: '20px', marginLeft: '6px' }}
                            />
                        </FadingTooltip>
                    )}
                </Box>
            </CustomTableCell>
            <CustomTableCell sx={{ width: '15%', color: '#999' }}>
                {guild ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 'fit-content',
                            overflow: 'hidden',
                            borderRadius: '50%',
                        }}
                    >
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
                    </Box>
                ) : (
                    guildIdShort
                )}
            </CustomTableCell>
            <CustomTableCell sx={{ color: '#999', width: '25%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', textWrap: 'nowrap' }}>
                    {flip.success ? (
                        <CustomLink href={`https://polygonscan.com/tx/${flip.transactionHash}`} target={'_blank'}>
                            {flip.transactionHash.substring(60)}
                        </CustomLink>
                    ) : (
                        <Typography sx={{ fontSize: '13px' }}>-</Typography>
                    )}
                    <Typography sx={{ fontSize: '12px' }}>{formatTimeAgo(flip.timestamp)}</Typography>
                </Box>
            </CustomTableCell>
        </>
    );
};
