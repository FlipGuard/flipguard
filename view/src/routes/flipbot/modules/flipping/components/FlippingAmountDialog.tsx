import { FLIPPING_MINIMUM_AMOUNTS_PER_TOKEN } from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { CustomDialog, CustomDialogTitle } from '../../../../../components/atoms/feedback/dialog/CustomDialog';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../../components/atoms/inputs/button/TertiaryButton';
import { NumericInput } from '../../../../../components/atoms/inputs/text-field/NumericInput';
import isViewMobile from '../../../../../hooks/utils/isViewMobile';

type Props = {
    token: string;
    isOpen: boolean;
    onClose: () => void;
    onCreate: (amount: number) => void;
};

export const FlippingAmountDialog = ({ token, isOpen, onClose, onCreate }: Props) => {
    const isMobile = isViewMobile('sm');

    const minimumAmount = FLIPPING_MINIMUM_AMOUNTS_PER_TOKEN[token] ?? 0.000001;
    const maximumAmount = 1_000_000_000;

    const [amount, setAmount] = useState(minimumAmount);

    useEffect(() => {
        setAmount(FLIPPING_MINIMUM_AMOUNTS_PER_TOKEN[token] ?? 0.000001);
    }, [token, isOpen]);

    const onAdd = () => {
        onCreate(amount);
        onClose();
        setAmount(minimumAmount);
    };

    return (
        <CustomDialog
            open={isOpen}
            onClose={onClose}
            sx={{ '& .MuiPaper-root': { minWidth: isMobile ? 'auto' : '400px' } }}
        >
            <CustomDialogTitle>
                {`Add ${token} bet amount`}
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={onClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </CustomDialogTitle>
            <DialogContent sx={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                <NumericInput
                    sx={{ margin: '8px' }}
                    type={'float'}
                    label={'Bet amount'}
                    maxValue={maximumAmount}
                    value={amount}
                    onValueChange={setAmount}
                    onEmpty={() => setAmount(minimumAmount)}
                    InputProps={{ endAdornment: token }}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', marginTop: '16px' }}>
                <TertiaryButton onClick={onClose}>Cancel</TertiaryButton>
                <PrimaryButton onClick={onAdd}>Add</PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
