import { FlipBotGuildConfigGetDto, FlipBotGuildConfigMoveToTeamDto } from '@flipguard/webapp-api';
import MultipleStopOutlinedIcon from '@mui/icons-material/MultipleStopOutlined';
import { DialogContentText } from '@mui/material';
import React, { useState } from 'react';

import { useGuildConfigMoveToTeamMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { ConfirmDialog } from '../../../../../components/atoms/feedback/dialog/ConfirmDialog';
import { CustomSelect } from '../../../../../components/atoms/inputs/select/CustomSelect';
import { useTeamContext } from '../../../../../contexts/team-context';

type Props = {
    config: FlipBotGuildConfigGetDto;
    isOpen: boolean;
    onClose: () => void;
};

export const FlipBotConfigurationMoveToTeamDialog = ({ config, isOpen, onClose }: Props) => {
    const { teams } = useTeamContext();

    const moveToTeamMutation = useGuildConfigMoveToTeamMutation();

    const [chosenTeamId, setChosenTeamId] = useState('');

    const onMoveToTeam = () => {
        const dto: FlipBotGuildConfigMoveToTeamDto = { teamId: chosenTeamId };

        moveToTeamMutation.mutate(
            { configId: config.id, dto },
            {
                onSettled: onClose,
            },
        );
    };

    return (
        <ConfirmDialog
            isOpen={isOpen}
            onClose={onClose}
            title={'Move FlipSuite Configuration to Team'}
            actionName={'Move'}
            actionIcon={MultipleStopOutlinedIcon}
            actionCallback={onMoveToTeam}
            isActionLoading={moveToTeamMutation.isLoading}
            disabled={!chosenTeamId}
        >
            <DialogContentText>
                {`Choose a team you want to move the "${config.name}" FlipSuite configuration to`}
            </DialogContentText>
            <CustomSelect
                sx={{ width: '100%', marginTop: '16px' }}
                label={'Team'}
                options={teams.map((t) => ({ label: t.name, value: t.id }))}
                onChange={(e) => setChosenTeamId(e.target.value)}
                value={chosenTeamId}
                disabled={teams.length === 0}
                select
            />
        </ConfirmDialog>
    );
};
