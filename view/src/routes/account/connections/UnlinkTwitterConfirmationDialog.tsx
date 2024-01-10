import LinkOffOutlinedIcon from '@mui/icons-material/LinkOffOutlined';
import { DialogContentText } from '@mui/material';

import { useUnlinkTwitterAccountMutation } from '../../../api/mutations/auth';
import { ConfirmDialog } from '../../../components/atoms/feedback/dialog/ConfirmDialog';

type Props = {
    open: boolean;
    handleClose: () => void;
};

export const UnlinkTwitterConfirmationDialog = ({ open, handleClose }: Props) => {
    const unlinkTwitter = useUnlinkTwitterAccountMutation();

    const onUnlink = () => {
        unlinkTwitter.mutate(undefined, {
            onSuccess: () => handleClose(),
        });
    };

    return (
        <ConfirmDialog
            isOpen={open}
            onClose={handleClose}
            title={`Unlink your Twitter account?`}
            actionName={'Unlink'}
            actionIcon={LinkOffOutlinedIcon}
            actionCallback={onUnlink}
            isActionLoading={unlinkTwitter.isLoading}
            isDanger={true}
        >
            <DialogContentText>
                Are you sure you want to unlink your Twitter account from your FlipGuard account?
            </DialogContentText>
        </ConfirmDialog>
    );
};
