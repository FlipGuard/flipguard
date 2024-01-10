import { TokenGatedRole } from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { WarningAlert } from '../../../../../components/atoms/feedback/alert/WarningAlert';
import { CustomDialog, CustomDialogTitle } from '../../../../../components/atoms/feedback/dialog/CustomDialog';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomTextField } from '../../../../../components/atoms/inputs/text-field/CustomTextField';
import { NumericInput } from '../../../../../components/atoms/inputs/text-field/NumericInput';
import isViewMobile from '../../../../../hooks/utils/isViewMobile';

const ROLE_DESCRIPTION = `
    In Discord, go to Server Settings > Roles and make sure the FlipSuite role is above the role 
    you've selected or it will not be automatically granted
`;

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (value: TokenGatedRole) => void;
};

export const AddTokenGatedRoleDialog = ({ isOpen, onClose, onAdd }: Props) => {
    const isMobile = isViewMobile('sm');

    const [roleId, setRoleId] = useState('');
    const [requiredBalance, setRequiredBalance] = useState(0);

    useEffect(() => {
        if (!isOpen) {
            setRoleId('');
            setRequiredBalance(0);
        }
    }, [isOpen]);

    const handleAdd = () => {
        onAdd({ roleId, requiredBalance });
        onClose();
    };

    return (
        <CustomDialog
            open={isOpen}
            onClose={onClose}
            sx={{ '& .MuiPaper-root': { minWidth: isMobile ? 'auto' : '400px' } }}
        >
            <CustomDialogTitle>
                Add token gated role
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={onClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </CustomDialogTitle>
            <DialogContent sx={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                <CustomTextField
                    sx={{ margin: '8px' }}
                    label={'Role ID'}
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                    inputProps={{ maxLength: 128 }}
                />
                <WarningAlert sx={{ margin: '8px' }}>{ROLE_DESCRIPTION}</WarningAlert>
                <NumericInput
                    sx={{ margin: '8px' }}
                    type={'float'}
                    label={'Required balance'}
                    value={requiredBalance}
                    onValueChange={setRequiredBalance}
                    onEmpty={() => setRequiredBalance(0)}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', marginTop: '16px' }}>
                <TertiaryButton onClick={onClose}>Cancel</TertiaryButton>
                <PrimaryButton onClick={handleAdd} disabled={!roleId || requiredBalance <= 0}>
                    Add
                </PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
