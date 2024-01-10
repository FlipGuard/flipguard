import { FlipBotGlobalGuildConfig } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useGlobalGuildSettingsDeleteMutation } from '../../../../../api/mutations/flipbot-global-config';
import { DiscordServerIcon } from '../../../../../components/atoms/data-display/DiscordServerIcon';
import { LoadingIconButton } from '../../../../../components/atoms/inputs/button/LoadingIconButton';
import { CustomTableCell, CustomTableRow } from '../../../../../components/molecules/table/CustomTable';
import { UpdateGuildGlobalConfigDialog } from '../components/UpdateGuildGlobalConfigDialog';

type Props = {
    settings: FlipBotGlobalGuildConfig;
};

export const GuildGlobalSettingsTableRow = ({ settings }: Props) => {
    const deleteMutation = useGlobalGuildSettingsDeleteMutation();

    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    const onDelete = () => {
        deleteMutation.mutate(settings.guildId);
    };

    return (
        <CustomTableRow>
            <CustomTableCell sx={{ paddingLeft: '16px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DiscordServerIcon
                        guildId={settings.guildId}
                        icon={settings.icon}
                        sx={{ width: '32px', height: '32px', marginRight: '8px' }}
                    />
                    <Typography>{settings.name}</Typography>
                </Box>
            </CustomTableCell>
            <CustomTableCell align={'center'}>{settings.guildId}</CustomTableCell>
            <CustomTableCell align={'center'}>{settings.memberCount || '?'}</CustomTableCell>
            <CustomTableCell align={'center'}>{settings.verified ? 'YES' : 'NO'}</CustomTableCell>
            <CustomTableCell align={'center'}>
                <Stack direction={'row'} justifyContent={'center'}>
                    <IconButton sx={{ color: '#fff' }} onClick={() => setIsUpdateDialogOpen(true)}>
                        <EditOutlinedIcon />
                    </IconButton>
                    <LoadingIconButton sx={{ color: '#fff' }} loading={deleteMutation.isLoading} onClick={onDelete}>
                        <DeleteOutlineOutlinedIcon />
                    </LoadingIconButton>
                </Stack>
            </CustomTableCell>
            <UpdateGuildGlobalConfigDialog
                settings={settings}
                isOpen={isUpdateDialogOpen}
                onClose={() => setIsUpdateDialogOpen(false)}
            />
        </CustomTableRow>
    );
};
