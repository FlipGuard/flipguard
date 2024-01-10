import { distinct } from '@flipguard/commons';
import { TeamModel, TeamUpdateDto } from '@flipguard/webapp-api';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SaveIcon from '@mui/icons-material/Save';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Divider, Typography } from '@mui/material';
import equal from 'fast-deep-equal';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useUpdateTeamMutation } from '../../../api/mutations/teams';
import { PrimaryButton } from '../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../components/atoms/inputs/button/TertiaryButton';
import { CustomTextField } from '../../../components/atoms/inputs/text-field/CustomTextField';
import { HeaderBox } from '../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../components/atoms/utils/HeaderText';
import { RoutePath } from '../../../config/constants/navigation';
import isViewMobile from '../../../hooks/utils/isViewMobile';
import { TeamMember } from './TeamMember';

type Props = {
    team: TeamModel;
};

export const TeamEdit = ({ team }: Props) => {
    const isMobile = isViewMobile();
    const [, setLocation] = useLocation();

    const updateMutation = useUpdateTeamMutation();

    const [name, setName] = useState(team.name);
    const [members, setMembers] = useState(team.members);
    const [newMemberDiscordId, setNewMemberDiscordId] = useState('');

    const onSave = () => {
        const dto: TeamUpdateDto = { name, members };
        updateMutation.mutate(
            { teamId: team.id, dto },
            {
                onSuccess: () => {
                    setLocation(RoutePath.Teams);
                },
            },
        );
    };

    const saveDisabled = name.length < 3 || (name === team.name && equal(members, team.members));

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
                marginTop: isMobile ? '0px' : '16px',
            }}
        >
            <HeaderBox sx={{ marginTop: 0 }}>
                <AssignmentOutlinedIcon />
                <HeaderText>{team.name}</HeaderText>
            </HeaderBox>
            <CustomTextField
                sx={{ margin: '8px', marginTop: '16px', flexGrow: 1 }}
                name={'Name'}
                label={'Name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <HeaderBox>
                <PeopleAltOutlinedIcon />
                <HeaderText>{'Members'}</HeaderText>
            </HeaderBox>
            <Box sx={{ margin: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {members.map((userId) => (
                    <TeamMember
                        key={userId}
                        userId={userId}
                        removable={userId !== team.owner}
                        onDelete={() => setMembers((prev) => prev.filter((id) => id !== userId))}
                    />
                ))}
            </Box>
            <Divider sx={{ margin: '16px 8px', borderStyle: 'dashed' }} />
            <Box
                sx={{
                    margin: '8px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '16px',
                }}
            >
                <CustomTextField
                    sx={{ flexGrow: 1 }}
                    name={'User Discord ID'}
                    label={'User Discord ID'}
                    value={newMemberDiscordId}
                    onChange={(e) => setNewMemberDiscordId(e.target.value)}
                />
                <TertiaryButton
                    sx={{ height: '40px' }}
                    onClick={() => {
                        setMembers((prev) => distinct([...prev, newMemberDiscordId]));
                        setNewMemberDiscordId('');
                    }}
                    disabled={members.length >= 16}
                >
                    Add Member
                </TertiaryButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    margin: '8px',
                    marginTop: '32px',
                }}
            >
                <TertiaryButton icon={WestOutlinedIcon} onClick={() => setLocation(RoutePath.Teams)}>
                    Back
                </TertiaryButton>
                <Typography sx={{ flexGrow: 1 }} />
                <PrimaryButton
                    disabled={saveDisabled}
                    disableOnNoAuth={true}
                    loading={updateMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={onSave}
                >
                    Save
                </PrimaryButton>
            </Box>
        </Card>
    );
};
