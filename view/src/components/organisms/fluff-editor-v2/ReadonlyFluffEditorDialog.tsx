import { NftEventType } from '@flipguard/domain';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Box, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import React from 'react';

import { useAuth } from '../../../hooks/use-auth';
import isViewMobile from '../../../hooks/utils/isViewMobile';
import { CustomDialog } from '../../atoms/feedback/dialog/CustomDialog';
import { FluffEditorV2 } from './FluffEditorV2';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    code: string[];
};

export const ReadonlyFluffEditorDialog = ({ isOpen, onClose, code }: Props) => {
    const { user } = useAuth();
    const isMobile = isViewMobile('sm');

    return (
        <CustomDialog
            open={isOpen}
            onClose={onClose}
            sx={{ '& .MuiPaper-root': { minWidth: isMobile ? '260px' : '1000px' } }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '12px 6px 12px 12px',
                    wordBreak: 'break-all',
                }}
            >
                Equivalent fluff code
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={onClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ padding: '0 12px', paddingBottom: '12px' }}>
                <Box
                    sx={(theme) => ({
                        border: '1px solid #282828',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        padding: '8px 6px',
                        background: theme.palette.primary.main,
                    })}
                >
                    <FluffEditorV2
                        code={code}
                        onChange={() => {}}
                        onLint={() => {}}
                        mode={'bot'}
                        ctx={{
                            eventTypes: [NftEventType.Listing, NftEventType.Sale, NftEventType.AutobuySale],
                            readOnly: true,
                            extensions: user.metadata.extensions,
                            integrations: user.metadata.integrations,
                            permissions: user.details.permissions,
                            templates: user.metadata.templates,
                        }}
                    />
                </Box>
            </DialogContent>
        </CustomDialog>
    );
};
