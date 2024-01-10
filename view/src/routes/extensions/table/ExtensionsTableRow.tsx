import { BotExtensionGetDto } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, IconButton, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { CustomTableCell, CustomTableRow } from '../../../components/molecules/table/CustomTable';
import { RoutePath } from '../../../config/constants/navigation';
import { useAuth } from '../../../hooks/use-auth';
import { formatTimeAgo } from '../../../utils/timestamps';
import { EventTypeChip } from '../../message-templates/chips/EventTypeChips';
import { ExtensionDeleteDialog } from '../ExtensionDeleteDialog';

type Props = {
    extension: BotExtensionGetDto;
};

export const ExtensionsTableRow = ({ extension }: Props) => {
    const [, setLocation] = useLocation();
    const { user } = useAuth();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

    const timesUsed = Object.values(user.metadata.bots)
        .map((b) => b.usedExtensions.filter((e) => e === extension.id).length)
        .reduce((a, b) => a + b, 0);

    return (
        <CustomTableRow>
            <CustomTableCell
                sx={{
                    paddingLeft: '16px',
                    textOverflow: 'ellipsis',
                    maxWidth: '256px',
                    overflow: 'hidden',
                }}
            >
                {extension.id}
            </CustomTableCell>
            <CustomTableCell>
                <Box sx={{ display: 'flex' }}>
                    {extension.triggers.map((trigger, idx) => (
                        <EventTypeChip key={idx} type={trigger} sx={{ marginLeft: idx !== 0 ? '6px' : 0 }} />
                    ))}
                </Box>
            </CustomTableCell>
            <CustomTableCell>{timesUsed}</CustomTableCell>
            <CustomTableCell>{formatTimeAgo(extension.updatedAt)}</CustomTableCell>
            <CustomTableCell>
                <Stack direction={'row'} justifyContent={'center'}>
                    <IconButton
                        sx={{ color: '#fff' }}
                        onClick={() => setLocation(RoutePath.ExtensionsEdit + '/' + extension.id)}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#fff' }} onClick={() => setDeleteDialogOpen(true)}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Stack>
            </CustomTableCell>
            <ExtensionDeleteDialog
                extension={extension}
                open={deleteDialogOpen}
                handleClose={() => setDeleteDialogOpen(false)}
            />
        </CustomTableRow>
    );
};
