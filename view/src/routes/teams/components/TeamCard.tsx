import { TeamModel } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Card, CardActions, CardContent, IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { UserAvatar } from '../../../components/molecules/users/UserAvatar';
import { RoutePath } from '../../../config/constants/navigation';
import { useAuth } from '../../../hooks/use-auth';
import { TeamDeleteDialog } from './TeamDeleteDialog';

type Props = {
    team: TeamModel;
};

export const TeamCard = ({ team }: Props) => {
    const [, setLocation] = useLocation();
    const { user } = useAuth();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const isOwner = team.owner === user.id;

    return (
        <Card>
            <CardContent sx={{ marginTop: '-6px', marginBottom: '-18px', wordBreak: 'break-word' }}>
                <Typography variant={'h6'}>{team.name}</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '8px', marginBottom: '2px' }}>
                    {team.members.map((userId) => (
                        <UserAvatar sx={{ width: '36px' }} key={userId} userId={userId} />
                    ))}
                </Box>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '-4px',
                }}
            >
                <Stack direction={'row'} justifyContent={'center'}>
                    <IconButton onClick={() => setLocation(RoutePath.TeamsEdit + '/' + team.id)} disabled={!isOwner}>
                        <EditOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={() => setIsDeleteDialogOpen(true)} disabled={!isOwner}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Stack>
            </CardActions>
            <TeamDeleteDialog team={team} isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} />
        </Card>
    );
};
