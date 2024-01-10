import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IconButton, Stack } from '@mui/material';
import React from 'react';

import { CustomTableCell, CustomTableRow } from '../../../../../components/molecules/table/CustomTable';

type Props = {
    idx: number;
    line: string;
    onEdit: () => void;
    onRemove: () => void;
    loading: boolean;
};

export const RumbleLinesTableRow = ({ idx, line, onEdit, onRemove, loading }: Props) => {
    return (
        <CustomTableRow>
            <CustomTableCell sx={{ paddingLeft: '16px' }}>{idx + 1}</CustomTableCell>
            <CustomTableCell align={'left'}>{line}</CustomTableCell>
            <CustomTableCell align={'center'}>
                <Stack direction={'row'} justifyContent={'center'}>
                    <IconButton sx={{ color: '#fff' }} disabled={loading} onClick={onEdit}>
                        <EditOutlinedIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#fff' }} disabled={loading} onClick={onRemove}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Stack>
            </CustomTableCell>
        </CustomTableRow>
    );
};
