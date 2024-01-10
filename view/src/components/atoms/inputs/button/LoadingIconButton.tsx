import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { styled } from '@mui/material';
import React from 'react';

const CustomLoadingButton = styled(LoadingButton)({
    color: '#fff',
    minWidth: 'auto',
    padding: '5px',
    borderRadius: '50%',
    '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
});

export const LoadingIconButton = ({ children, ...props }: LoadingButtonProps) => {
    return (
        <CustomLoadingButton {...props}>
            {/* https://github.com/mui/material-ui/issues/27853 */}
            <div style={{ display: 'flex' }}>{children}</div>
        </CustomLoadingButton>
    );
};
