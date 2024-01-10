import { SweepContestSaleStatus, SweepContestType } from '@flipguard/webapp-api';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { Box, styled, TableCell, TableCellProps, Typography } from '@mui/material';
import React from 'react';

import { useSweepContestSetWalletStatusMutation } from '../../../../../api/mutations/sweep-contests';
import MaticIcon from '../../../../../assets/polygon-icon.png';
import { TertiaryButton } from '../../../../../components/atoms/inputs/button/TertiaryButton';
import isViewMobile from '../../../../../hooks/utils/isViewMobile';
import { isWalletBanned, isWalletVerified } from '../../../../../utils/sweep-contests';
import { displaySuccessToast } from '../../../../../utils/toasts';
import { ParticipantStatusIcon } from '../ParticipantStatusIcon';
import { ParticipantsTableRowContext, ParticipantsTableRowData } from './Virtuoso';

const RowCell = styled(TableCell, {
    shouldForwardProp: (key) => key !== 'winner',
})<TableCellProps & { winner: boolean }>(({ theme, winner }) => ({
    backgroundColor: theme.palette.primary.main,
    color: winner ? '#e8cd68' : '#ddd',
    padding: '12px 16px',
    borderTop: `1px solid #282828`,
    borderBottom: 'none',
}));

type Props = {
    row: ParticipantsTableRowData;
    ctx: ParticipantsTableRowContext;
};

export const ParticipantsTableRow = ({ row, ctx: { isAdminView, sweepContest } }: Props) => {
    const isMobile = isViewMobile(1100);

    const setWalletStatusMutation = useSweepContestSetWalletStatusMutation();

    const addr = row.participant.address;
    const uiWalletAddress = isMobile ? addr.substring(0, 4) + '...' + addr.substring(addr.length - 4) : addr;

    const onBlock = () => {
        setWalletStatusMutation.mutate(
            {
                sweepContestId: sweepContest.id,
                dto: {
                    address: row.participant.address,
                    status: SweepContestSaleStatus.BLOCKED,
                },
            },
            {
                onSuccess: () => {
                    displaySuccessToast('Wallet has been blocked');
                },
            },
        );
    };

    return (
        <>
            <RowCell
                winner={row.winner}
                sx={{ width: isMobile ? '12%' : '10%', paddingLeft: '16px', position: 'relative', overflow: 'hidden' }}
            >
                {row.num}
                <ParticipantStatusIcon sweepContest={sweepContest} participant={row.participant} />
            </RowCell>
            <RowCell winner={row.winner} sx={{ width: isMobile ? '7%' : '3%' }}>
                {row.winner && (
                    <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                        <EmojiEventsOutlinedIcon sx={{ fontSize: '20px', marginRight: '-24px' }} />
                    </Box>
                )}
            </RowCell>
            <RowCell winner={row.winner} sx={{ width: isMobile ? '25%' : '30%' }}>
                {uiWalletAddress}
            </RowCell>
            <RowCell winner={row.winner} align={'right'} sx={{ width: isMobile ? '30%' : '15%' }}>
                {sweepContest.type === SweepContestType.VOLUME ? <MaticVolumeDecorator value={row.score} /> : row.score}
            </RowCell>
            {isAdminView && (
                <RowCell winner={row.winner} align={'right'} sx={{ width: isMobile ? '30%' : '15%' }}>
                    {sweepContest.type === SweepContestType.QUANTITY ? (
                        <MaticVolumeDecorator value={row.volume} />
                    ) : (
                        row.purchases
                    )}
                </RowCell>
            )}
            <RowCell winner={row.winner} align={'right'} sx={{ width: isMobile ? '24%' : '20%' }}>
                {row.winChance}
            </RowCell>
            {isAdminView && (
                <RowCell winner={row.winner} align={'center'} sx={{ width: '1px' }}>
                    <Box sx={{ height: '20px', borderLeft: '1px solid #282828' }} />
                </RowCell>
            )}
            {isAdminView && (
                <RowCell winner={row.winner} align={'center'} sx={{ width: '7%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TertiaryButton
                            size={'small'}
                            loading={setWalletStatusMutation.isLoading}
                            disabled={
                                isWalletBanned(row.participant.address, sweepContest) ||
                                isWalletVerified(row.participant, sweepContest)
                            }
                            icon={BlockOutlinedIcon}
                            onClick={onBlock}
                            sx={{ background: '#cb3e3eee', '&:hover': { background: '#cb3e3e' } }}
                        >
                            Block
                        </TertiaryButton>
                    </Box>
                </RowCell>
            )}
        </>
    );
};

type MaticVolumeDecoratorProps = {
    value: string;
};

const MaticVolumeDecorator = ({ value }: MaticVolumeDecoratorProps) => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Typography sx={{ textWrap: 'nowrap', fontSize: '14px' }}>{value}</Typography>
            <img src={MaticIcon} alt={'matic'} width={18} height={18} style={{ marginLeft: '4px' }} />
        </Box>
    );
};
