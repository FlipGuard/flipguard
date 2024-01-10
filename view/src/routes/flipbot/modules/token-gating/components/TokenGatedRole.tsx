import { TokenGatedRole as TokenGatedRoleType } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';

import { DiscordQueryKeys, getGuildRoles } from '../../../../../api/requests/discord';
import { RemovableElement } from '../../../../../components/atoms/inputs/utils/RemovableElement';
import { useFlipBotContext } from '../../../../../contexts/flipbot-context';
import { useQueryOnce } from '../../../../../hooks/use-query-once';

type Props = {
    role: TokenGatedRoleType;
    onDelete: () => void;
};

export const TokenGatedRole = ({ role, onDelete }: Props) => {
    const { scopedConfig } = useFlipBotContext();

    const assignedGuildId = scopedConfig?.assignedGuild?.id ?? '';

    const { data: guildRoles = [] } = useQueryOnce(
        DiscordQueryKeys.rolesForGuild(assignedGuildId),
        () => getGuildRoles(assignedGuildId),
        {
            enabled: !!assignedGuildId,
        },
    );

    const roleMetadata = guildRoles.find((r) => r.id === role.roleId);

    return (
        <RemovableElement sx={{ width: '100%' }} onDelete={onDelete}>
            <Box
                sx={{
                    border: '1px solid #333',
                    borderRadius: '6px',
                    padding: '12px',
                    width: '100%',
                    overflowX: 'auto',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Role:</Typography>
                    {roleMetadata ? (
                        <Typography sx={{ color: roleMetadata.color }}>{`@${roleMetadata.name}`}</Typography>
                    ) : (
                        <Typography>{role.roleId}</Typography>
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Required balance:</Typography>
                    <Typography>{role.requiredBalance}</Typography>
                </Box>
            </Box>
        </RemovableElement>
    );
};
