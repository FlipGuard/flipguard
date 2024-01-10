import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import { DialogContentText } from '@mui/material';

import { useDeactivateAccountMutation } from '../../../api/mutations/auth';
import { ConfirmDialog } from '../../../components/atoms/feedback/dialog/ConfirmDialog';

type Props = {
    open: boolean;
    handleClose: () => void;
};

export const AccountDeletionConfirmationDialog = ({ open, handleClose }: Props) => {
    const deactivateAccountMutation = useDeactivateAccountMutation();

    const onDeactivate = () => {
        deactivateAccountMutation.mutate(undefined, {
            onSuccess: handleClose,
        });
    };

    return (
        <ConfirmDialog
            isOpen={open}
            onClose={handleClose}
            title={`Deactivate account?`}
            actionName={'Deactivate'}
            actionIcon={PersonRemoveOutlinedIcon}
            actionCallback={onDeactivate}
            isActionLoading={deactivateAccountMutation.isLoading}
            isDanger={true}
        >
            <DialogContentText>
                Deactivating your account will cause it to be deleted after the 14 days period. During that period you
                can log in as normal and activate your account again.
            </DialogContentText>
        </ConfirmDialog>
    );
};
