import { FlipBotGlobalRumbleConfig } from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';

import { CustomDialog, CustomDialogTitle } from '../../../../../components/atoms/feedback/dialog/CustomDialog';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomTextField } from '../../../../../components/atoms/inputs/text-field/CustomTextField';
import isViewMobile from '../../../../../hooks/utils/isViewMobile';

type Props = {
    type: keyof FlipBotGlobalRumbleConfig['lines'];
    onAdd: (line: string) => void;
    loading: boolean;
    isOpen: boolean;
    onClose: () => void;
};

export const AddRumbleLineDialog = ({ type, onAdd, loading, isOpen, onClose }: Props) => {
    const isMobile = isViewMobile();

    const [line, setLine] = useState('');

    return (
        <CustomDialog
            open={isOpen}
            onClose={onClose}
            sx={{ '& .MuiPaper-root': { minWidth: isMobile ? 'auto' : '400px' } }}
        >
            <CustomDialogTitle>
                {`Add rumble ${type} line`}
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={onClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </CustomDialogTitle>
            <DialogContent sx={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                <CustomTextField
                    sx={{ margin: '8px' }}
                    value={line}
                    onChange={(e) => setLine(e.target.value)}
                    multiline
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', marginTop: '16px' }}>
                <TertiaryButton onClick={onClose}>Cancel</TertiaryButton>
                <PrimaryButton
                    onClick={() => {
                        setLine('');
                        onAdd(line);
                    }}
                    disabled={!line}
                    loading={loading}
                >
                    Add
                </PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
