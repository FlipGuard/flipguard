import { MessageTemplate } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IconButton, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { CustomTableCell, CustomTableRow } from '../../../components/molecules/table/CustomTable';
import { RoutePath } from '../../../config/constants/navigation';
import { useAuth } from '../../../hooks/use-auth';
import { formatTimeAgo } from '../../../utils/timestamps';
import { EventTypeChip } from '../chips/EventTypeChips';
import { MessageTypeChip } from '../chips/MessageTypeChips';
import { MessageTemplateDeleteDialog } from '../MessageTemplateDeleteDialog';

type Props = {
    template: MessageTemplate;
};

export const MessageTemplatesTableRow = ({ template }: Props) => {
    const [, setLocation] = useLocation();
    const { user } = useAuth();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

    const timesUsed = Object.values(user.metadata.bots)
        .map((b) => b.usedTemplates.filter((t) => t === template.id).length)
        .reduce((a, b) => a + b, 0);

    return (
        <CustomTableRow>
            <CustomTableCell
                sx={{ paddingLeft: '16px', textOverflow: 'ellipsis', maxWidth: '256px', overflow: 'hidden' }}
            >
                {template.id}
            </CustomTableCell>
            <CustomTableCell>
                <MessageTypeChip type={template.messageType} />
            </CustomTableCell>
            <CustomTableCell>
                <EventTypeChip type={template.eventType} />
            </CustomTableCell>
            <CustomTableCell>{timesUsed}</CustomTableCell>
            <CustomTableCell>{formatTimeAgo(template.updatedAt)}</CustomTableCell>
            <CustomTableCell>
                <Stack direction={'row'} justifyContent={'center'}>
                    <IconButton
                        sx={{ color: '#fff' }}
                        onClick={() => setLocation(RoutePath.MessageTemplatesEdit + '/' + template.id)}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#fff' }} onClick={() => setDeleteDialogOpen(true)}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Stack>
            </CustomTableCell>
            <MessageTemplateDeleteDialog
                template={template}
                open={deleteDialogOpen}
                handleClose={() => setDeleteDialogOpen(false)}
            />
        </CustomTableRow>
    );
};
