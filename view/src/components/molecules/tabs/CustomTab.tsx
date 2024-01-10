import { Button, ButtonProps, styled } from '@mui/material';
import { ComponentType } from 'react';

export const CustomTab = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'active',
})<ButtonProps & { active: boolean }>(({ active }) => ({
    textWrap: 'nowrap',
    padding: '4px 8px',
    margin: '2px',
    height: '30px',
    minWidth: 'fit-content',
    fontSize: '15px',
    fontWeight: 400,
    color: '#999',
    textTransform: 'none',
    transition: 'none',
    border: '1px solid transparent',
    borderRadius: '5px',
    '&:hover': {
        background: '#2b2c2f',
        color: '#aaa',
    },
    ...(active && {
        background: '#2b2c2f',
        color: '#fff',
        border: '1px solid #363636',
        '&:hover': {
            color: '#fff',
            background: '#2b2c2f',
        },
    }),
})) as ComponentType<ButtonProps & { active: boolean }>;
