import { FlippingContest } from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Box, DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import React from 'react';

import { CustomDialog, CustomDialogTitle } from '../../../../components/atoms/feedback/dialog/CustomDialog';
import { TertiaryButton } from '../../../../components/atoms/inputs/button/TertiaryButton';
import isViewMobile from '../../../../hooks/utils/isViewMobile';

type Props = {
    contest: FlippingContest;
    isOpen: boolean;
    onClose: () => void;
};

export const FlippingEventInfoDialog = ({ contest, isOpen, onClose }: Props) => {
    const isMobile = isViewMobile('sm');

    const formatTime = (time: number) => {
        const dateSettings: Intl.DateTimeFormatOptions = { timeStyle: 'short', dateStyle: 'short' };
        return Intl.DateTimeFormat(undefined, dateSettings).format(time);
    };

    return (
        <CustomDialog
            sx={{ '& .MuiDialog-paper': { minWidth: isMobile ? 'auto' : '500px' } }}
            open={isOpen}
            onClose={onClose}
        >
            <CustomDialogTitle>
                {contest.name}
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={onClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </CustomDialogTitle>
            <DialogContent sx={{ padding: '12px' }}>
                <Typography sx={{ fontSize: '14px', color: '#999', marginBottom: '4px' }}>Description</Typography>
                <Box sx={{ padding: '12px', background: '#1a1a1a', borderRadius: '6px', border: '1px solid #333' }}>
                    <Typography sx={{ whiteSpace: 'break-spaces' }}>{contest.description}</Typography>
                </Box>
                <Typography sx={{ fontSize: '14px', color: '#999', margin: '16px 0 4px 0' }}>Details</Typography>
                <Box
                    sx={{
                        padding: '12px',
                        background: '#1a1a1a',
                        borderRadius: '6px',
                        border: '1px solid #333',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: '#aaa' }}>From:</Typography>
                        <Typography>{formatTime(contest.startTime)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: '#aaa' }}>To:</Typography>
                        <Typography>{formatTime(contest.endTime)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: '#aaa' }}>Token:</Typography>
                        <Typography sx={{ whiteSpace: 'break-spaces' }}>{contest.token}</Typography>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'flex-end',
                    padding: '12px',
                }}
            >
                <TertiaryButton onClick={onClose}>Close</TertiaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
