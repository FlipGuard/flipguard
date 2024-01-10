import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { DialogContentText } from '@mui/material';

import { useOrderCancelMutation } from '../../../api/mutations/orders';
import { ConfirmDialog } from '../../../components/atoms/feedback/dialog/ConfirmDialog';
import { displaySuccessToast } from '../../../utils/toasts';

type Props = {
    orderId: string;
    open: boolean;
    handleClose: () => void;
};

export const CancelOrderDialog = ({ orderId, open, handleClose }: Props) => {
    const cancelOrderMutation = useOrderCancelMutation();

    const onCancel = () => {
        cancelOrderMutation.mutate(
            { orderId },
            {
                onSuccess: () => {
                    displaySuccessToast('Order has been cancelled');
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
            title={`Cancel order "${orderId.substring(0, 8)}"?`}
            actionName={'Cancel'}
            actionIcon={CancelOutlinedIcon}
            actionCallback={onCancel}
            isActionLoading={cancelOrderMutation.isLoading}
            isDanger={true}
        >
            <DialogContentText>
                You will not be able to fulfill this order anymore once you cancel it. This action is irreversible.
            </DialogContentText>
        </ConfirmDialog>
    );
};
