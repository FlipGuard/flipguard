import { FlipBotGuildConfigGetDto } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LinkOffOutlinedIcon from '@mui/icons-material/LinkOffOutlined';
import MultipleStopOutlinedIcon from '@mui/icons-material/MultipleStopOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';

import { TertiaryButton } from '../../../../components/atoms/inputs/button/TertiaryButton';
import { useAuth } from '../../../../hooks/use-auth';
import { FlipBotConfigurationDeleteDialog } from './dialogs/FlipBotConfigurationDeleteDialog';
import { FlipBotConfigurationMoveToTeamDialog } from './dialogs/FlipBotConfigurationMoveToTeamDialog';
import { FlipBotConfigurationRemoveFromTeamDialog } from './dialogs/FlipBotConfigurationRemoveFromTeamDialog';
import { FlipBotUnassignGuildConfirmDialog } from './dialogs/FlipBotConfigurationUnassignGuildConfirmDialog';

type Props = {
    guildConfig?: FlipBotGuildConfigGetDto;
};

export const FlipBotConfigurationSettings = ({ guildConfig }: Props) => {
    const { user } = useAuth();

    const [unassignDialogOpen, setUnassignDialogOpen] = useState(false);
    const [isMoveToTeamDialogOpen, setIsMoveToTeamDialogOpen] = useState(false);
    const [isRemoveFromTeamDialogOpen, setIsRemoveFromTeamDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const isOwner = guildConfig && guildConfig.userId === user.id;

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', margin: '16px 0' }}>
                <SettingsOutlinedIcon sx={{ marginRight: '8px' }} />
                <Typography sx={{ fontSize: '20px' }}>Settings</Typography>
            </Box>
            <Box
                sx={{
                    marginTop: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}
            >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {guildConfig?.teamId ? (
                        <TertiaryButton
                            sx={{ height: '40px', flexGrow: 1 }}
                            icon={MultipleStopOutlinedIcon}
                            onClick={() => setIsRemoveFromTeamDialogOpen(true)}
                            disabled={!guildConfig || !guildConfig.teamId || !isOwner}
                        >
                            Remove from Team
                        </TertiaryButton>
                    ) : (
                        <TertiaryButton
                            sx={{ height: '36px', flexGrow: 1 }}
                            icon={MultipleStopOutlinedIcon}
                            onClick={() => setIsMoveToTeamDialogOpen(true)}
                            disabled={!guildConfig || !!guildConfig.teamId || !isOwner}
                        >
                            Move to Team
                        </TertiaryButton>
                    )}
                    <TertiaryButton
                        sx={{ height: '36px', flexGrow: 1 }}
                        icon={LinkOffOutlinedIcon}
                        disabled={!guildConfig || !guildConfig.assignedGuild || !isOwner}
                        onClick={() => setUnassignDialogOpen(true)}
                    >
                        Disconnect from Discord
                    </TertiaryButton>
                </Box>
                <Divider />
                <TertiaryButton
                    sx={{ height: '36px' }}
                    icon={DeleteOutlineOutlinedIcon}
                    isDanger={true}
                    onClick={() => setIsDeleteDialogOpen(true)}
                    disabled={!guildConfig || !isOwner}
                >
                    Delete this configuration
                </TertiaryButton>
            </Box>
            {guildConfig && (
                <>
                    <FlipBotUnassignGuildConfirmDialog
                        configId={guildConfig.id}
                        isOpen={unassignDialogOpen}
                        onClose={() => setUnassignDialogOpen(false)}
                    />
                    <FlipBotConfigurationMoveToTeamDialog
                        config={guildConfig}
                        isOpen={isMoveToTeamDialogOpen}
                        onClose={() => setIsMoveToTeamDialogOpen(false)}
                    />
                    <FlipBotConfigurationRemoveFromTeamDialog
                        config={guildConfig}
                        isOpen={isRemoveFromTeamDialogOpen}
                        onClose={() => setIsRemoveFromTeamDialogOpen(false)}
                    />
                    <FlipBotConfigurationDeleteDialog
                        config={guildConfig}
                        isOpen={isDeleteDialogOpen}
                        onClose={() => setIsDeleteDialogOpen(false)}
                    />
                </>
            )}
        </>
    );
};
