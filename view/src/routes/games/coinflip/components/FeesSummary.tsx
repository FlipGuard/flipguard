import { FlippingRoomDto } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';
import React from 'react';

import { DiscordQueryKeys, getGuildRoles, getMyDiscordRoles } from '../../../../api/requests/discord';
import { DiscordAvatar } from '../../../../components/atoms/data-display/DiscordAvatar';
import { FadingTooltip } from '../../../../components/atoms/feedback/tooltip/FadingTooltip';
import { useAuth } from '../../../../hooks/use-auth';
import { useQueryOnce } from '../../../../hooks/use-query-once';

type Props = {
    flippingRoom: FlippingRoomDto;
};

export const FeesSummary = ({ flippingRoom }: Props) => {
    const { authenticated, user } = useAuth();
    const { roomId } = flippingRoom;

    const { data: userRoles = [] } = useQueryOnce(
        DiscordQueryKeys.myRolesForGuild(roomId),
        () => getMyDiscordRoles(roomId),
        { enabled: authenticated },
    );

    const { data: roomRoles = [] } = useQueryOnce(DiscordQueryKeys.rolesForGuild(roomId), () => getGuildRoles(roomId));

    const rolesToDisplay = [
        { id: 'default', name: 'Default', color: '#fff', prefix: '', fee: flippingRoom.defaultFee },
        ...roomRoles
            .filter((r) => flippingRoom.roleFees[r.id] !== undefined)
            .sort((a, b) => flippingRoom.roleFees[b.id] - flippingRoom.roleFees[a.id])
            .map((r) => ({ ...r, prefix: '@', fee: flippingRoom.roleFees[r.id] })),
    ];

    const lowestFeeRole = rolesToDisplay
        .slice(1)
        .filter((role) => userRoles.some((r) => r.id === role.id))
        .sort((a, b) => a.fee - b.fee)
        .map((r) => r.id)[0];

    return (
        <Box>
            {rolesToDisplay.map((role) => {
                const active = role.id === lowestFeeRole || (!lowestFeeRole && role.id === 'default');
                return (
                    <Box key={role.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: role.color }}>{`${role.prefix}${role.name}`}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {active && (
                                <FadingTooltip title={'Your fee'}>
                                    <span style={{ marginRight: '6px' }}>
                                        <DiscordAvatar
                                            userId={user.id}
                                            avatar={user.model.display.avatar}
                                            sx={{ width: '22px', height: '22px' }}
                                        />
                                    </span>
                                </FadingTooltip>
                            )}
                            <Typography sx={{ color: role.color }}>{`${role.fee}%`}</Typography>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};
