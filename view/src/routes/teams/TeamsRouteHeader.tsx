import { TeamModel } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { useAuth } from '../../hooks/use-auth';
import isViewMobile from '../../hooks/utils/isViewMobile';
import { TeamCreateDialog } from './create/TeamCreateDialog';

const HEADER_TEXT = 'Teams you own or belong to';

type Props = {
    teams: TeamModel[];
};

export const TeamsRouteHeader = ({ teams }: Props) => {
    const isMobile = isViewMobile();
    const { user } = useAuth();

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const ownedTeams = teams.filter((t) => t.owner === user.id);

    return (
        <>
            {isMobile && <Typography>{HEADER_TEXT}</Typography>}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    placeContent: 'flex-end',
                    marginTop: isMobile ? '24px' : '16px',
                }}
            >
                {!isMobile && <Typography sx={{ marginBottom: '16px' }}>{HEADER_TEXT}</Typography>}
                <Typography sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: isMobile ? 0 : '16px' }}>
                    <PrimaryButton onClick={() => setIsCreateDialogOpen(true)} disabled={ownedTeams.length >= 3}>
                        Create Team
                    </PrimaryButton>
                </Box>
            </Box>
            <TeamCreateDialog isOpen={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)} />
        </>
    );
};
