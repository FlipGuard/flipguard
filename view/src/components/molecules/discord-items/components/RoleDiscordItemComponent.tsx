import { formatDuration } from '@flipguard/commons';
import { RoleDiscordItem } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { DiscordQueryKeys, getGuildRoles } from '../../../../api/requests/discord';
import { useFlipBotContext } from '../../../../contexts/flipbot-context';
import { useQueryOnce } from '../../../../hooks/use-query-once';
import { RemovableElement } from '../../../atoms/inputs/utils/RemovableElement';

type Props = {
    item: RoleDiscordItem;
    onDelete: () => void;
    children?: ReactNode;
};

export const RoleDiscordItemComponent = ({ item, onDelete, children }: Props) => {
    const { scopedConfig } = useFlipBotContext();

    const assignedGuildId = scopedConfig?.assignedGuild?.id ?? '';

    const { data: guildRoles = [] } = useQueryOnce(
        DiscordQueryKeys.rolesForGuild(assignedGuildId),
        () => getGuildRoles(assignedGuildId),
        {
            enabled: !!assignedGuildId,
        },
    );

    const roleMetadata = guildRoles.find((r) => r.id === item.roleId);

    return (
        <RemovableElement sx={{ width: '100%' }} onDelete={onDelete}>
            <Box sx={{ border: '1px solid #333', borderRadius: '6px', padding: '12px', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Type: </Typography>
                    <Typography>Role</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Role:</Typography>
                    {roleMetadata ? (
                        <Typography sx={{ color: roleMetadata.color }}>{`@${roleMetadata.name}`}</Typography>
                    ) : (
                        <Typography>{item.roleId}</Typography>
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Duration:</Typography>
                    <Typography>{item.duration ? formatDuration(item.duration) : 'Infinite'}</Typography>
                </Box>
                {children}
            </Box>
        </RemovableElement>
    );
};
