import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box, BoxProps, styled } from '@mui/material';
import React from 'react';

const Container = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'disabled',
})(({ disabled }: { disabled: boolean }) => ({
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px dashed #555',
    borderRadius: '8px',
    padding: '8px 10px',
    '&:hover': {
        border: disabled ? '1px dashed #555' : '1px dashed #888',
        cursor: disabled ? 'not-allowed' : 'pointer',
    },
    '&:hover svg': {
        color: disabled ? 'auto' : '#aaa',
    },
}));

type Props = BoxProps & {
    disabled: boolean;
    onClick: () => void;
};

export const AddElementButton = ({ disabled, onClick, ...boxProps }: Props) => {
    return (
        <Container
            disabled={disabled}
            onClick={() => {
                if (!disabled) {
                    onClick();
                }
            }}
            {...boxProps}
        >
            <AddCircleOutlineOutlinedIcon sx={{ color: '#555' }} />
        </Container>
    );
};
