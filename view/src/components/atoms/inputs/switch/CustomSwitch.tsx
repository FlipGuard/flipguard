import { FormControlLabel, FormControlLabelProps, styled, Switch } from '@mui/material';
import React from 'react';

const StyledSwitch = styled(Switch)(({ theme }) => ({
    margin: '0 8px',
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#fff',
        '&:hover': {
            backgroundColor: `#ffffff22`,
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: theme.palette.tertiary.light,
    },
    '& .MuiSwitch-switchBase.Mui-checked.Mui-disabled': {
        color: '#666',
    },
}));

type Props = Omit<FormControlLabelProps, 'control' | 'onChange'> & {
    checked: boolean;
    onChange: (checked: boolean) => void;
};

export const CustomSwitch = ({ checked, onChange, ...fromControlLabelProps }: Props) => {
    return (
        <FormControlLabel
            {...fromControlLabelProps}
            control={<StyledSwitch size={'small'} checked={checked} onChange={(e) => onChange(e.target.checked)} />}
        />
    );
};
