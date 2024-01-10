import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DialogTitle, IconButton, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

import { CustomDialog } from './CustomDialog';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
};

export const ConfirmDialogBase = ({ isOpen, onClose, title, children }: Props) => {
    return (
        <CustomDialog open={isOpen} onClose={onClose}>
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '12px 6px 12px 12px',
                    wordBreak: 'break-all',
                }}
            >
                {title}
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={onClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </DialogTitle>
            {children}
        </CustomDialog>
    );
};
