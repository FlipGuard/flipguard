import { BotExtensionGetDto } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { RoutePath } from '../../../config/constants/navigation';
import { formatTimeAgo } from '../../../utils/timestamps';
import { EventTypeChip } from '../../message-templates/chips/EventTypeChips';
import { ExtensionDeleteDialog } from '../ExtensionDeleteDialog';

type Props = {
    extension: BotExtensionGetDto;
};

export const ExtensionCard = ({ extension }: Props) => {
    const [, setLocation] = useLocation();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const isNoDescription = extension.description === '';

    return (
        <Card>
            <CardContent sx={{ marginBottom: isNoDescription ? '-24px' : '-12px', wordBreak: 'break-word' }}>
                <Typography variant={'h6'}>{extension.id}</Typography>
            </CardContent>
            {!isNoDescription && (
                <CardContent sx={{ marginBottom: '-20px', wordBreak: 'break-word' }}>
                    <Typography sx={{ fontSize: '14px' }}>{extension.description}</Typography>
                </CardContent>
            )}
            <CardContent sx={{ marginBottom: '-12px' }}>
                <Box sx={{ display: 'flex', alignItems: 'start', marginTop: '12px' }}>
                    {extension.triggers.map((trigger, idx) => (
                        <EventTypeChip key={idx} type={trigger} sx={{ marginLeft: idx !== 0 ? '6px' : 0 }} />
                    ))}
                </Box>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ paddingLeft: '8px' }}>
                    <Typography
                        sx={(theme) => ({ fontSize: '13px', color: theme.palette.tertiaryButton.dark })}
                    >{`Updated ${formatTimeAgo(extension.updatedAt, false)}`}</Typography>
                </Box>
                <Box>
                    <IconButton onClick={() => setLocation(RoutePath.ExtensionsEdit + '/' + extension.id)}>
                        <EditOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={() => setDeleteDialogOpen(true)}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Box>
            </CardActions>
            <ExtensionDeleteDialog
                extension={extension}
                open={deleteDialogOpen}
                handleClose={() => setDeleteDialogOpen(false)}
            />
        </Card>
    );
};
