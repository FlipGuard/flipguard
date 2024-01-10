import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { IconButton } from '@mui/material';
import React from 'react';

type Props = {
    onClick: () => void;
};

export const FieldAddButton = ({ onClick }: Props) => {
    return (
        <IconButton
            sx={(theme) => ({
                color: '#ddd',
                border: '1px dashed #777',
                borderRadius: '4px',
                width: 'calc(100% - 16px)',
                height: '48px',
                margin: '4px 8px',
                '&:hover': {
                    backgroundColor: `${theme.palette.primary.light}77`,
                },
            })}
            onClick={onClick}
            disableRipple
        >
            <AddCircleOutlineOutlinedIcon sx={{ fontSize: '1.5rem' }} />
        </IconButton>
    );
};
