import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';

import { InfoAlert } from '../../components/atoms/feedback/alert/InfoAlert';
import { CustomDialog } from '../../components/atoms/feedback/dialog/CustomDialog';
import { FadingTooltip } from '../../components/atoms/feedback/tooltip/FadingTooltip';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { CustomTextField } from '../../components/atoms/inputs/text-field/CustomTextField';
import { useAuth } from '../../hooks/use-auth';
import isViewMobile from '../../hooks/utils/isViewMobile';
import { getRefCodeFromCookie } from '../../utils/refcodes';

type Props = {
    open: boolean;
    onClose: () => void;
    onConfirm: (refCode?: string) => void;
};

export const PurchaseConfirmationDialog = ({ open, onClose, onConfirm }: Props) => {
    const isMobile = isViewMobile('sm');
    const { user } = useAuth();

    const cookieRefCode = getRefCodeFromCookie();
    const showRefCodeInput = user.canUseRefCode();

    const [refCode, setRefCode] = useState(cookieRefCode ?? '');

    const handleClose = () => {
        onClose();
        setRefCode('');
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
                Confirm purchase
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={handleClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ padding: '12px 12px 12px 12px' }}>
                <Typography>
                    Once you confirm your purchase by clicking the button below, an order in our system will get created
                    and you will be asked to transfer funds into one of our wallets.
                </Typography>
                {showRefCodeInput && (
                    <>
                        <Divider sx={{ margin: '12px 0' }} />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography>Have a referral code? Use it to get a 10% discount!</Typography>
                            <FadingTooltip title={'Applies only for the first purchase'} placement={'top'}>
                                <HelpOutlineIcon sx={{ marginLeft: '6px', color: '#aaa' }} />
                            </FadingTooltip>
                        </Box>
                        <Box sx={{ display: 'flex', marginTop: '12px' }}>
                            <CustomTextField
                                sx={{ flexGrow: 1, marginTop: '4px' }}
                                name={'Referral code'}
                                label={'Referral code'}
                                value={refCode}
                                onChange={(e) => setRefCode(e.target.value)}
                                inputProps={{ maxLength: 64 }}
                            />
                        </Box>
                    </>
                )}
                <InfoAlert sx={{ marginTop: '16px' }}>
                    When you send a transaction our system will check if everything is correct. This process may take up
                    to a minute so please bear with us and do not close this window during that time :)
                </InfoAlert>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'space-between',
                    padding: '12px',
                }}
            >
                <TertiaryButton onClick={handleClose}>Cancel</TertiaryButton>
                <PrimaryButton
                    onClick={() => {
                        onConfirm(showRefCodeInput && refCode ? refCode : undefined);
                        handleClose();
                    }}
                >
                    Confirm
                </PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
