import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';

import { CustomDialog, CustomDialogTitle } from '../../../../../../../components/atoms/feedback/dialog/CustomDialog';
import { PrimaryButton } from '../../../../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomTextField } from '../../../../../../../components/atoms/inputs/text-field/CustomTextField';
import isViewMobile from '../../../../../../../hooks/utils/isViewMobile';

type Props = {
    reservedNames: string[];
    isOpen: boolean;
    onClose: () => void;
    onAdd: (name: string) => void;
};

export const AddRaidingRewardPoolDialog = ({ reservedNames, isOpen, onClose, onAdd }: Props) => {
    const isMobile = isViewMobile('sm');

    const [name, setName] = useState('');

    const handleAdd = () => {
        onAdd(name);
        onClose();
        setName('');
    };

    const error = reservedNames.includes(name) ? 'This reward pool name is already taken' : undefined;
    const disabled = !!error || name.length < 3;

    return (
        <CustomDialog
            open={isOpen}
            onClose={onClose}
            sx={{ '& .MuiPaper-root': { minWidth: isMobile ? 'auto' : '400px' } }}
        >
            <CustomDialogTitle>
                Add reward pool
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={onClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </CustomDialogTitle>
            <DialogContent sx={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                <CustomTextField
                    sx={{ margin: '8px' }}
                    label={'Name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    inputProps={{ maxLength: 128 }}
                    error={!!error}
                    helperText={error}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', marginTop: '16px' }}>
                <TertiaryButton onClick={onClose}>Cancel</TertiaryButton>
                <PrimaryButton onClick={handleAdd} disabled={disabled}>
                    Add
                </PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
