import { SweepContestSale, SweepContestSaleStatus } from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
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
    open: boolean;
    onClose: () => void;
};

export const BannedSaleDialog = ({ sweepContestId, sale, open, onClose }: Props) => {
    const isMobile = isViewMobile('sm');

    const setSaleStatusMutation = useSweepContestSetSaleStatusMutation();

    const onUnblock = () => {
        setSaleStatusMutation.mutate(
            {
                sweepContestId: sweepContestId,
                dto: {
                    id: sale.id,
                    status: SweepContestSaleStatus.NONE,
                },
            },
            {
                onSettled: onClose,
                onSuccess: () => {
                    displaySuccessToast('Sale has been unblocked');
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
                {`Sale of ${sale.nft.name}`}
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={onClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </CustomDialogTitle>
            <DialogContent sx={{ padding: '0 12px' }}>
                <SaleDialogMetadata sale={sale} status={'Blocked'} />
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
                <TertiaryButton loading={setSaleStatusMutation.isLoading} onClick={onUnblock}>
                    Unblock
                </TertiaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
