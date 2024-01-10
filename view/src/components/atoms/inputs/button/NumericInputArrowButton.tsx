import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import { Button, ButtonProps, styled } from '@mui/material';
import React from 'react';

import { PrimaryButtonProps } from './PrimaryButton';

const StyledButton = styled(Button)<ButtonProps & { direction: string }>(({ direction }) => ({
    background: '#444',
    color: '#fff',
    minWidth: '24px',
    borderRadius: 0,
    borderTopLeftRadius: direction === 'up' ? '4px' : 0,
    borderTopRightRadius: direction === 'up' ? '4px' : 0,
    borderBottomLeftRadius: direction === 'down' ? '4px' : 0,
    borderBottomRightRadius: direction === 'down' ? '4px' : 0,
    padding: '0',
    height: '19px',
    boxShadow: 'none',
    marginTop: 0,
    '& svg': {
        fontSize: '18px',
    },
    '&:hover': {
        background: '#3a3a3a',
    },
}));

type Props = PrimaryButtonProps & {
    direction: 'up' | 'down';
    onPress: () => void;
};

export const NumericInputArrowButton = ({ direction, onPress, ...props }: Props) => {
    const icon = direction === 'up' ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />;

    return (
        <StyledButton direction={direction} onClick={onPress} {...props}>
            {icon}
        </StyledButton>
    );
};
