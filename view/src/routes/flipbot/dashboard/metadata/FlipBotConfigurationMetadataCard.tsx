import { FlipBotGuildConfigGetDto } from '@flipguard/webapp-api';
import { Box, Card, Typography } from '@mui/material';
import React from 'react';

import { FlipProfileQueryKeys, getFlipProfileAvatarOf } from '../../../../api/requests/flip-profiles';
import { useTeamContext } from '../../../../contexts/team-context';
import { useAuth } from '../../../../hooks/use-auth';
import { useQueryOnce } from '../../../../hooks/use-query-once';
import isViewMobile from '../../../../hooks/utils/isViewMobile';

type Props = {
    guildConfig?: FlipBotGuildConfigGetDto;
};

export const FlipBotConfigurationMetadataCard = ({ guildConfig }: Props) => {
    const { user } = useAuth();
    const { teams } = useTeamContext();

    const isMobile = isViewMobile();

    const { data: ownerInfo } = useQueryOnce(
        FlipProfileQueryKeys.avatar(guildConfig?.userId ?? user.id),
        () => getFlipProfileAvatarOf(guildConfig?.userId ?? user.id),
        { enabled: !!guildConfig },
    );

    const guildIdFull = guildConfig ? guildConfig.id : '-';
    const guildIdShort = guildConfig ? guildConfig.id.substring(0, 8) : '-';
    const teamName = guildConfig?.teamId ? teams.find((t) => t.id === guildConfig.teamId)?.name ?? '???' : '-';
    const ownerName = guildConfig ? ownerInfo?.username ?? guildConfig.userId : '-';
    const owner = guildConfig ? (guildConfig.userId === user.id ? 'You' : ownerName) : '-';

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '10px 16px 8px 16px',
                minHeight: '64px',
            }}
        >
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '14px', color: '#aaa' }}>{`ID:`}</Typography>
                    <Typography sx={{ fontSize: '14px', color: '#aaa' }}>
                        {isMobile ? guildIdShort : guildIdFull}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '14px', color: '#aaa' }}>{'Discord Server:'}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '14px', color: '#aaa' }}>
                            {guildConfig?.assignedGuild?.name ?? '-'}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '14px', color: '#aaa' }}>{'Team:'}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '14px', color: '#aaa' }}>{teamName}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '14px', color: '#aaa' }}>{'Owner:'}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '14px', color: '#aaa' }}>{owner}</Typography>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};
