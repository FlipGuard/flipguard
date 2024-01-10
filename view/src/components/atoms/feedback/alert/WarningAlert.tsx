import { Alert, AlertProps, styled } from '@mui/material';
import React from 'react';

const StyledAlert = styled(Alert)({
    alignItems: 'center',
    fontSize: '13px',
    fontWeight: 300,
    padding: '4px 16px',
    border: `1px solid #f8bd4f90`,
    background: `#f8bd4f16`,
    '& .MuiAlert-icon': {
        color: '#f8bd4f',
        opacity: 1,
    },
    '& .MuiAlert-message': {
        textAlign: 'left',
        color: '#f8bd4f',
    },
});

export const WarningAlert = (props: AlertProps) => {
    return <StyledAlert severity="warning" variant={'filled'} {...props} />;
};
