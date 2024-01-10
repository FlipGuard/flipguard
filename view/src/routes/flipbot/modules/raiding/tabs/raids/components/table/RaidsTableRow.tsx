import { capitalize } from '@flipguard/commons';
import { TwitterRaid } from '@flipguard/webapp-api';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { CustomTableCell, CustomTableRow } from '../../../../../../../../components/molecules/table/CustomTable';
import { RoutePath } from '../../../../../../../../config/constants/navigation';
import { formatTimeUntil } from '../../../../../../../../utils/timestamps';
import { RaidDeleteDialog } from './RaidDeleteDialog';
import { RaidStatusEndedChip, RaidStatusOngoingChip } from './RaidStatusChips';

type Props = {
    configId: string;
    raid: TwitterRaid;
};

export const RaidsTableRow = ({ raid, configId }: Props) => {
    const [, setLocation] = useLocation();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    return (
        <CustomTableRow>
            <CustomTableCell sx={{ paddingLeft: '16px' }}>{raid.title}</CustomTableCell>
            <CustomTableCell>
                {raid.endTime < Date.now() ? <RaidStatusEndedChip /> : <RaidStatusOngoingChip />}
            </CustomTableCell>
            <CustomTableCell>{formatTimeUntil(raid.endTime, false)}</CustomTableCell>
            <CustomTableCell>{raid.requiredActions.map((v) => capitalize(v.toLowerCase())).join(', ')}</CustomTableCell>
            <CustomTableCell>{raid.raiders.length}</CustomTableCell>
            <CustomTableCell>
                <Stack direction={'row'} justifyContent={'center'}>
                    <IconButton onClick={() => setLocation(RoutePath.FlipBotModuleRaidingView + '/' + raid.id)}>
                        <AssessmentOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={() => setDeleteDialogOpen(true)}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Stack>
            </CustomTableCell>
            <RaidDeleteDialog
                raid={raid}
                configId={configId}
                isOpen={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            />
        </CustomTableRow>
    );
};
