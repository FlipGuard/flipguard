import { SweepContestParticipant, SweepContestSaleStatus } from '@flipguard/webapp-api';
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
    open: boolean;
    onClose: () => void;
};

export const BannedWalletDialog = ({ sweepContestId, participant, open, onClose }: Props) => {
    const isMobile = isViewMobile('sm');

    const setWalletStatusMutation = useSweepContestSetWalletStatusMutation();

    const address = participant.address;
    const addressShort = address.substring(0, 6) + '...' + address.substring(address.length - 6);

    const onUnblock = () => {
        setWalletStatusMutation.mutate(
            {
                sweepContestId: sweepContestId,
                dto: {
                    address: participant.address,
                    status: SweepContestSaleStatus.NONE,
                },
            },
            {
                onSettled: onClose,
                onSuccess: () => {
                    displaySuccessToast('Wallet has been unblocked');
                },
            },
        );
    };

    return (
        <CustomDialog
            open={open}
            onClose={onClose}
            sx={{ '& .MuiPaper-root': { minWidth: isMobile ? 'auto' : '560px' } }}
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
                    <Typography>Blocked</Typography>
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
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'end',
                    padding: '12px',
                    marginTop: '16px',
                }}
            >
                <TertiaryButton onClick={onClose}>Cancel</TertiaryButton>
                <TertiaryButton loading={setWalletStatusMutation.isLoading} onClick={onUnblock}>
                    Unblock
                </TertiaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
