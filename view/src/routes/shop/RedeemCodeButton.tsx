import { RedeemGiftCodeDto } from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Box, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

import { useRedeemCodeMutation } from '../../api/mutations/gift-codes';
import { CustomDialog } from '../../components/atoms/feedback/dialog/CustomDialog';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { CustomTextField } from '../../components/atoms/inputs/text-field/CustomTextField';
import isViewMobile from '../../hooks/utils/isViewMobile';

export const RedeemCodeButton = () => {
    const redeemCodeMutation = useRedeemCodeMutation();

    const [dialogOpen, setDialogOpen] = useState(false);

    const onRedeem = (code: string) => {
        const dto: RedeemGiftCodeDto = {
            id: code,
        };

        redeemCodeMutation.mutate(dto, {
            onSettled: () => {
                setDialogOpen(false);
            },
        });
    };

    return (
        <Box sx={{ minWidth: 'fit-content' }}>
            <PrimaryButton
                disableOnNoAuth={true}
                loading={dialogOpen || redeemCodeMutation.isLoading}
                onClick={() => setDialogOpen(true)}
            >
                Redeem code
            </PrimaryButton>
            <RedeemCodeDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                redeeming={redeemCodeMutation.isLoading}
                onRedeem={onRedeem}
            />
        </Box>
    );
};

type RedeemCodeDialogProps = {
    open: boolean;
    onClose: () => void;
    redeeming: boolean;
    onRedeem: (code: string) => void;
};

const RedeemCodeDialog = ({ open, onClose, redeeming, onRedeem }: RedeemCodeDialogProps) => {
    const isMobile = isViewMobile('sm');

    const [code, setCode] = useState('');

    const handleClose = () => {
        onClose();
        setCode('');
    };

    return (
        <CustomDialog
            sx={{ '& .MuiPaper-root': { minWidth: isMobile ? 'auto' : '420px', maxWidth: '500px' } }}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '12px 6px 12px 12px',
                    wordBreak: 'break-word',
                }}
            >
                Redeem your gift code
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={handleClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ padding: '12px 12px 12px 12px' }}>
                <Box sx={{ display: 'flex' }}>
                    <CustomTextField
                        sx={{ flexGrow: 1, marginTop: '8px' }}
                        name={'Code'}
                        label={'Code'}
                        placeholder={'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        inputProps={{ maxLength: 36 }}
                    />
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'space-between',
                    padding: '12px',
                }}
            >
                <TertiaryButton onClick={handleClose}>Cancel</TertiaryButton>
                <PrimaryButton
                    loading={redeeming}
                    disabled={code.length !== 36}
                    onClick={() => {
                        onRedeem(code);
                        setCode('');
                    }}
                >
                    Redeem
                </PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
