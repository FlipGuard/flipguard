import { WalletChain } from '@flipguard/webapp-api';
import LinkOffOutlinedIcon from '@mui/icons-material/LinkOffOutlined';
import { DialogContentText } from '@mui/material';

import { useUnlinkWalletMutation } from '../../../api/mutations/wallets';
import { ConfirmDialog } from '../../../components/atoms/feedback/dialog/ConfirmDialog';

type Props = {
    chain: WalletChain | null;
    open: boolean;
    handleClose: () => void;
};

export const UnlinkWalletConfirmationDialog = ({ chain, open, handleClose }: Props) => {
    const unlinkWalletMutation = useUnlinkWalletMutation();

    const onUnlink = () => {
        if (chain) {
            unlinkWalletMutation.mutate(chain, {
                onSuccess: () => {
                    handleClose();
                },
            });
        }
    };

    if (!chain) {
        return null;
    }

    return (
        <ConfirmDialog
            isOpen={open}
            onClose={handleClose}
            title={`Unlink ${chain[0].toUpperCase() + chain.substring(1)} wallet?`}
            actionName={'Unlink'}
            actionIcon={LinkOffOutlinedIcon}
            actionCallback={onUnlink}
            isActionLoading={unlinkWalletMutation.isLoading}
            isDanger={true}
        >
            <DialogContentText>Are you sure you want to unlink this wallet from your account?</DialogContentText>
        </ConfirmDialog>
    );
};
