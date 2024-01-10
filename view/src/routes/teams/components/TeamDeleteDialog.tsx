import { TeamModel } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DialogContentText } from '@mui/material';

import { useDeleteTeamMutation } from '../../../api/mutations/teams';
import { ConfirmDialog } from '../../../components/atoms/feedback/dialog/ConfirmDialog';

type Props = {
    team: TeamModel;
    isOpen: boolean;
    onClose: () => void;
};

export const TeamDeleteDialog = ({ team, isOpen, onClose }: Props) => {
    const deleteTeamMutation = useDeleteTeamMutation();

    const onDelete = () => {
        deleteTeamMutation.mutate(
            { teamId: team.id },
            {
                onSuccess: () => onClose(),
            },
        );
    };

    return (
        <ConfirmDialog
            isOpen={isOpen}
            onClose={onClose}
            title={`Delete ${team.name}`}
            actionName={'Delete'}
            actionIcon={DeleteOutlineOutlinedIcon}
            actionCallback={onDelete}
            isActionLoading={deleteTeamMutation.isLoading}
            isDanger={true}
        >
            <DialogContentText>{`Are you sure you want to delete ${team.name}?`}</DialogContentText>
        </ConfirmDialog>
    );
};
