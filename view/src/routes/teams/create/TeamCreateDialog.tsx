import { TeamCreateDto } from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useCreateTeamMutation } from '../../../api/mutations/teams';
import { CustomDialog, CustomDialogTitle } from '../../../components/atoms/feedback/dialog/CustomDialog';
import { PrimaryButton } from '../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../components/atoms/inputs/button/TertiaryButton';
import { CustomTextField } from '../../../components/atoms/inputs/text-field/CustomTextField';
import isViewMobile from '../../../hooks/utils/isViewMobile';
import { displaySuccessToast } from '../../../utils/toasts';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const TeamCreateDialog = ({ isOpen, onClose }: Props) => {
    const isMobile = isViewMobile();

    const createTeamMutation = useCreateTeamMutation();

    const [name, setName] = useState('');

    const onCreate = () => {
        const dto: TeamCreateDto = { name };
        createTeamMutation.mutate(
            { dto },
            {
                onSuccess: () => {
                    displaySuccessToast('Team has been created successfully!');
                    onClose();
                    setName('');
                },
            },
        );
    };

    return (
        <CustomDialog
            open={isOpen}
            onClose={onClose}
            sx={{ '& .MuiPaper-root': { minWidth: isMobile ? 'auto' : '400px' } }}
        >
            <CustomDialogTitle>
                Create Team
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={onClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </CustomDialogTitle>
            <DialogContent sx={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                <CustomTextField
                    sx={{ margin: '8px' }}
                    name={'Name'}
                    label={'Name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', marginTop: '16px' }}>
                <TertiaryButton onClick={onClose}>Cancel</TertiaryButton>
                <PrimaryButton onClick={onCreate} loading={createTeamMutation.isLoading} disabled={name.length < 3}>
                    Add
                </PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
