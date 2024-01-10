import { FLIPPING_MODULE_MAX_FEE, FLIPPING_MODULE_MIN_FEE, RoleFee } from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';

import { CustomDialog, CustomDialogTitle } from '../../../../../components/atoms/feedback/dialog/CustomDialog';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomNumericTextField } from '../../../../../components/atoms/inputs/text-field/CustomNumericTextField';
import { CustomTextField } from '../../../../../components/atoms/inputs/text-field/CustomTextField';
import isViewMobile from '../../../../../hooks/utils/isViewMobile';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (roleFee: RoleFee) => void;
};

export const RoleFeeAddDialog = ({ isOpen, onClose, onCreate }: Props) => {
    const isMobile = isViewMobile('sm');

    const [roleId, setRoleId] = useState('');
    const [description, setDescription] = useState('');
    const [fee, setFee] = useState(5);

    const isInvalidRoleId = !!roleId && isNaN(Number(roleId));
    const errorText = isInvalidRoleId ? 'Given value is not a Discord role ID' : '';

    const onAdd = () => {
        onCreate({ roleId, description, fee });
        onClose();
        setRoleId('');
        setFee(5);
    };

    return (
        <CustomDialog
            open={isOpen}
            onClose={onClose}
            sx={{ '& .MuiPaper-root': { minWidth: isMobile ? 'auto' : '400px' } }}
        >
            <CustomDialogTitle>
                Add fee per role
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={onClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </CustomDialogTitle>
            <DialogContent sx={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                <CustomTextField
                    sx={{ margin: '8px' }}
                    label={'Discord role ID'}
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                    error={isInvalidRoleId}
                    helperText={errorText}
                    required
                />
                <CustomNumericTextField
                    sx={{ margin: '8px' }}
                    label={'Fee'}
                    value={fee}
                    onValueChange={setFee}
                    minValue={FLIPPING_MODULE_MIN_FEE}
                    maxValue={FLIPPING_MODULE_MAX_FEE}
                    adornment={'% of the flip amount'}
                />
                <CustomTextField
                    sx={{ margin: '8px' }}
                    label={'Note'}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    inputProps={{ maxLength: 128 }}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', marginTop: '16px' }}>
                <TertiaryButton onClick={onClose}>Cancel</TertiaryButton>
                <PrimaryButton onClick={onAdd} disabled={!roleId || isInvalidRoleId}>
                    Add
                </PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
