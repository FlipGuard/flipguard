import { withNoSpacing } from '@flipguard/commons';
import { FlipBotGuildConfigGetDto, FlipBotGuildConfigMoveToTeamDto } from '@flipguard/webapp-api';
import MultipleStopOutlinedIcon from '@mui/icons-material/MultipleStopOutlined';
import { DialogContentText } from '@mui/material';
import React from 'react';

import { useGuildConfigMoveToTeamMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { ConfirmDialog } from '../../../../../components/atoms/feedback/dialog/ConfirmDialog';
import { useTeamContext } from '../../../../../contexts/team-context';

type Props = {
    config: FlipBotGuildConfigGetDto;
    isOpen: boolean;
    onClose: () => void;
};

export const FlipBotConfigurationRemoveFromTeamDialog = ({ config, isOpen, onClose }: Props) => {
    const { teams } = useTeamContext();

    const moveToTeamMutation = useGuildConfigMoveToTeamMutation();

    const onMoveToTeam = () => {
        const dto: FlipBotGuildConfigMoveToTeamDto = { teamId: undefined };

        moveToTeamMutation.mutate(
            { configId: config.id, dto },
            {
                onSettled: onClose,
            },
        );
    };

    const teamName = teams.find((t) => t.id === config.teamId)?.name ?? '???';

    return (
        <ConfirmDialog
            isOpen={isOpen}
            onClose={onClose}
            title={'Remove FlipSuite Configuration from a Team?'}
            actionName={'Remove'}
            actionIcon={MultipleStopOutlinedIcon}
            actionCallback={onMoveToTeam}
            isActionLoading={moveToTeamMutation.isLoading}
            isDanger={true}
        >
            <DialogContentText>
                {withNoSpacing(`
                    Are you sure you want to remove the "${config.name}" FlipSuite configuration from the "${teamName}" Team? 
                    Other members of the team will immediately lose their access to it.
                `)}
            </DialogContentText>
        </ConfirmDialog>
    );
};
