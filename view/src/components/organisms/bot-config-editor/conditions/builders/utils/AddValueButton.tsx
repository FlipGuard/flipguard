import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box } from '@mui/material';
import React from 'react';

type Props = {
    onClick: () => void;
};

export const AddValueButton = ({ onClick }: Props) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px dashed #555',
                borderRadius: '8px',
                padding: '8px 10px',
                marginTop: '16px',
                '&:hover': {
                    border: '1px dashed #888',
                    cursor: 'pointer',
                },
                '&:hover svg': {
                    color: '#aaa',
                },
            }}
            onClick={onClick}
        >
            <AddCircleOutlineOutlinedIcon sx={{ color: '#555' }} />
        </Box>
    );
};
