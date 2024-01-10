import { DialogActions, DialogContent, SvgIcon } from '@mui/material';
import React, { ReactNode } from 'react';

import { PrimaryButton } from '../../inputs/button/PrimaryButton';
import { TertiaryButton } from '../../inputs/button/TertiaryButton';
import { ConfirmDialogBase } from './ConfirmDialogBase';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    actionName: string;
    actionIcon: typeof SvgIcon;
    actionCallback: () => void;
    isActionLoading: boolean;
    children: ReactNode;
    isDanger?: boolean;
    disabled?: boolean;
};

export const ConfirmDialog = ({
    isOpen,
    onClose,
    title,
    actionName,
    actionIcon,
    actionCallback,
    isActionLoading,
    children,
    isDanger,
    disabled,
}: Props) => {
    return (
        <ConfirmDialogBase isOpen={isOpen} onClose={onClose} title={title}>
            <DialogContent sx={{ padding: '12px' }}>{children}</DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'space-between',
                    padding: '12px',
                }}
            >
                <TertiaryButton onClick={onClose}>Cancel</TertiaryButton>
                <PrimaryButton
                    onClick={actionCallback}
                    icon={actionIcon}
                    loading={isActionLoading}
                    loadingPosition={'start'}
                    disabled={disabled}
                    isDanger={isDanger}
                >
                    {actionName}
                </PrimaryButton>
            </DialogActions>
        </ConfirmDialogBase>
    );
};
