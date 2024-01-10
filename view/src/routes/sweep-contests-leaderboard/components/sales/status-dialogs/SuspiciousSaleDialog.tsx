import { SweepContestSale, SweepContestSaleStatus } from '@flipguard/webapp-api';
import { SweepContestSuspiciousSale } from '@flipguard/webapp-api';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Box, DialogActions, DialogContent, Divider, IconButton, Typography } from '@mui/material';
import React from 'react';

import { useSweepContestSetSaleStatusMutation } from '../../../../../api/mutations/sweep-contests';
import { CustomDialog, CustomDialogTitle } from '../../../../../components/atoms/feedback/dialog/CustomDialog';
import { TertiaryButton } from '../../../../../components/atoms/inputs/button/TertiaryButton';
import isViewMobile from '../../../../../hooks/utils/isViewMobile';
import { displaySuccessToast } from '../../../../../utils/toasts';
import { SaleDialogMetadata } from './SaleDialogMetadata';

type Props = {
    sweepContestId: string;
    sale: SweepContestSale;
    suspiciousInfo: SweepContestSuspiciousSale;
    open: boolean;
    onClose: () => void;
};

export const SuspiciousSaleDialog = ({ sweepContestId, sale, suspiciousInfo, open, onClose }: Props) => {
    const isMobile = isViewMobile('sm');

    const setSaleStatusMutationBlock = useSweepContestSetSaleStatusMutation();
    const setSaleStatusMutationVerify = useSweepContestSetSaleStatusMutation();

    const onBlock = () => {
        setSaleStatusMutationBlock.mutate(
            {
                sweepContestId: sweepContestId,
                dto: {
                    id: sale.id,
                    status: SweepContestSaleStatus.BLOCKED,
                },
            },
            {
                onSettled: onClose,
                onSuccess: () => {
                    displaySuccessToast('Sale has been blocked');
                },
            },
        );
    };

    const onVerify = () => {
        setSaleStatusMutationVerify.mutate(
            {
                sweepContestId: sweepContestId,
                dto: {
                    id: sale.id,
                    status: SweepContestSaleStatus.VERIFIED,
                },
            },
            {
                onSuccess: () => {
                    displaySuccessToast('Sale has been verified');
                },
                onSettled: onClose,
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
                {`Sale of ${sale.nft.name}`}
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={onClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </CustomDialogTitle>
            <DialogContent sx={{ padding: '0 12px' }}>
                <SaleDialogMetadata sale={sale} status={'Suspicious'} />
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
                        disabled={setSaleStatusMutationVerify.isLoading}
                        loading={setSaleStatusMutationBlock.isLoading}
                        sx={{ background: '#cb3e3eee', '&:hover': { background: '#cb3e3e' } }}
                        tooltipMessage={'Blocked sales are not shown on a public leaderboard'}
                        tooltipPlacement={'top'}
                    >
                        Block
                    </TertiaryButton>
                    <Box sx={{ width: '12px' }} />
                    <TertiaryButton
                        icon={CheckCircleOutlinedIcon}
                        onClick={onVerify}
                        disabled={setSaleStatusMutationBlock.isLoading}
                        loading={setSaleStatusMutationVerify.isLoading}
                        sx={{ background: '#35ab58ee', '&:hover': { background: '#35ab58' } }}
                        tooltipMessage={'Verified sales are not being marked as suspicious anymore'}
                        tooltipPlacement={'top'}
                    >
                        Verify
                    </TertiaryButton>
                </Box>
            </DialogActions>
        </CustomDialog>
    );
};
