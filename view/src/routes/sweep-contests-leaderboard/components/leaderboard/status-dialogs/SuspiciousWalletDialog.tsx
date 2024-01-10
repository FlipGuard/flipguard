import { SweepContestParticipant, SweepContestSaleStatus, SweepContestSuspiciousWallet } from '@flipguard/webapp-api';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Box, DialogActions, DialogContent, Divider, IconButton, Typography } from '@mui/material';
import React from 'react';

import { useSweepContestSetWalletStatusMutation } from '../../../../../api/mutations/sweep-contests';
import { CustomDialog, CustomDialogTitle } from '../../../../../components/atoms/feedback/dialog/CustomDialog';
import { TertiaryButton } from '../../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomLink } from '../../../../../components/atoms/navigation/CustomLink';
import isViewMobile from '../../../../../hooks/utils/isViewMobile';
import { displaySuccessToast } from '../../../../../utils/toasts';

type Props = {
    sweepContestId: string;
    participant: SweepContestParticipant;
    suspiciousInfo: SweepContestSuspiciousWallet;
    open: boolean;
    onClose: () => void;
};

export const SuspiciousWalletDialog = ({ sweepContestId, participant, suspiciousInfo, open, onClose }: Props) => {
    const isMobile = isViewMobile('sm');

    const setWalletStatusMutationBlock = useSweepContestSetWalletStatusMutation();
    const setWalletStatusMutationVerify = useSweepContestSetWalletStatusMutation();

    const address = participant.address;
    const addressShort = address.substring(0, 6) + '...' + address.substring(address.length - 6);

    const onBlock = () => {
        setWalletStatusMutationBlock.mutate(
            {
                sweepContestId: sweepContestId,
                dto: {
                    address: participant.address,
                    status: SweepContestSaleStatus.BLOCKED,
                },
            },
            {
                onSettled: onClose,
                onSuccess: () => {
                    displaySuccessToast('Wallet has been blocked');
                },
            },
        );
    };

    const onVerify = () => {
        setWalletStatusMutationVerify.mutate(
            {
                sweepContestId: sweepContestId,
                dto: {
                    address: participant.address,
                    status: SweepContestSaleStatus.VERIFIED,
                },
            },
            {
                onSettled: onClose,
                onSuccess: () => {
                    displaySuccessToast('Wallet has been verified');
                },
            },
        );
    };

    return (
        <CustomDialog
            open={open}
            onClose={onClose}
            sx={{ '& .MuiPaper-root': { minWidth: isMobile ? 'auto' : '700px' } }}
        >
            <CustomDialogTitle>
                {`Wallet ${addressShort}`}
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={onClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </CustomDialogTitle>
            <DialogContent sx={{ padding: '0 12px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Status:</Typography>
                    <Typography>Suspicious</Typography>
                </Box>
                <Divider sx={{ margin: '8px 0' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Address:</Typography>
                    <CustomLink
                        sx={{ fontSize: '1rem' }}
                        href={`https://polygonscan.com/address/${address}`}
                        target={'_blank'}
                        rel={'noreferrer'}
                    >
                        {isMobile ? addressShort : address}
                    </CustomLink>
                </Box>
                <Divider sx={{ margin: '8px 0' }} />
                <Box>
                    <Typography>Marked as suspicious because:</Typography>
                    <Typography sx={{ whiteSpace: 'break-spaces' }}>
                        {suspiciousInfo.reasons.map((r) => `• ${r}`).join('\n') || '-'}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    marginTop: '16px',
                }}
            >
                {!isMobile && <TertiaryButton onClick={onClose}>Cancel</TertiaryButton>}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: isMobile ? '100%' : 'auto' }}>
                    <TertiaryButton
                        icon={BlockOutlinedIcon}
                        onClick={onBlock}
                        disabled={setWalletStatusMutationVerify.isLoading}
                        loading={setWalletStatusMutationBlock.isLoading}
                        sx={{ background: '#cb3e3eee', '&:hover': { background: '#cb3e3e' } }}
                        tooltipMessage={'Blocked wallets are not shown on a public leaderboard'}
                        tooltipPlacement={'top'}
                    >
                        Block
                    </TertiaryButton>
                    <Box sx={{ width: '12px' }} />
                    <TertiaryButton
                        icon={CheckCircleOutlinedIcon}
                        onClick={onVerify}
                        disabled={setWalletStatusMutationBlock.isLoading}
                        loading={setWalletStatusMutationVerify.isLoading}
                        sx={{ background: '#35ab58ee', '&:hover': { background: '#35ab58' } }}
                        tooltipMessage={'Verified wallets are not being marked as suspicious anymore'}
                        tooltipPlacement={'top'}
                    >
                        Verify
                    </TertiaryButton>
                </Box>
            </DialogActions>
        </CustomDialog>
    );
};
