import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { DialogContent, DialogContentText } from '@mui/material';
import React, { useState } from 'react';

import { useOrderVerifyMutation } from '../../../api/mutations/orders';
import { ConfirmDialog } from '../../../components/atoms/feedback/dialog/ConfirmDialog';
import { CustomTextField } from '../../../components/atoms/inputs/text-field/CustomTextField';
import { displaySuccessToast } from '../../../utils/toasts';

type Props = {
    orderId: string;
    open: boolean;
    handleClose: () => void;
};

export const VerifyOrderDialog = ({ orderId, open, handleClose }: Props) => {
    const verifyOrderMutation = useOrderVerifyMutation();

    const [txHash, setTxHash] = useState('');

    const onVerify = () => {
        verifyOrderMutation.mutate(
            { orderId, txHash },
            {
                onSuccess: () => {
                    displaySuccessToast('Order has been verified');
                },
                onSettled: () => {
                    handleClose();
                },
            },
        );
    };

    return (
        <ConfirmDialog
            isOpen={open}
            onClose={handleClose}
            title={`Verify order "${orderId.substring(0, 8)}"`}
            actionName={'Verify'}
            actionIcon={ReceiptLongOutlinedIcon}
            actionCallback={onVerify}
            isActionLoading={verifyOrderMutation.isLoading}
            disabled={txHash === ''}
        >
            <DialogContentText>Enter hash of the transaction that fulfills this order:</DialogContentText>
            <DialogContent sx={{ padding: '16px 0 0 0' }}>
                <CustomTextField
                    sx={{ width: '100%' }}
                    name={'Transaction Hash'}
                    label={'Transaction Hash'}
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    inputProps={{
                        maxLength: 128,
                    }}
                />
            </DialogContent>
        </ConfirmDialog>
    );
};
