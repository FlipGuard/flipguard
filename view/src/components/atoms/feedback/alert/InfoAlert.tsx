import { Alert, AlertProps, styled } from '@mui/material';
import React from 'react';

const StyledAlert = styled(Alert)(({ theme }) => ({
    alignItems: 'center',
    fontSize: '13px',
    fontWeight: 300,
    padding: '4px 16px',
    border: `1px solid ${theme.palette.tertiary.main}30`,
    background: `${theme.palette.tertiary.main}20`,
    '& .MuiAlert-icon': {
        color: theme.palette.tertiary.main,
        opacity: 1,
    },
    '& .MuiAlert-message': {
        textAlign: 'left',
        color: '#fff',
    },
}));

export const InfoAlert = (props: AlertProps) => {
    return <StyledAlert severity="info" variant={'filled'} {...props} />;
};
