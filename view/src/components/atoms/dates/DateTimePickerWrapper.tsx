import { Box, BoxProps, styled } from '@mui/material';
import { ComponentType } from 'react';

export const DateTimePickerWrapper = styled(Box)(({ theme }) => ({
    // Text field props
    '& input': {
        padding: '8.5px 14px',
    },
    '& .MuiFormLabel-root': {
        color: theme.palette.inputLabel.main,
    },
    '& .MuiFormLabel-root.Mui-disabled': {
        color: '#444',
    },
    '& .MuiFormLabel-root .Mui-error, & .MuiFormLabel-root.Mui-error': {
        color: theme.palette.error.main,
    },
    '& .MuiFormLabel-root.Mui-focused': {
        color: theme.palette.activeInputBorder.main,
        zIndex: 0,
    },
    '& .MuiFormLabel-root.Mui-focused.Mui-error': {
        color: theme.palette.error.light,
        zIndex: 0,
    },
    fieldset: {
        borderColor: theme.palette.inputBorder.main,
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: theme.palette.inputBorder.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.activeInputBorder.main,
            borderWidth: '1px',
        },
    },
    '& .MuiOutlinedInput-root.Mui-error': {
        '&:hover fieldset': {
            borderColor: theme.palette.error.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.error.light,
            borderWidth: '1px',
        },
    },
    '& .MuiOutlinedInput-root.Mui-disabled fieldset': {
        borderColor: '#444',
    },
    // Calendar props
    '& MuiPickersDay-root.Mui-selected': {
        backgroundColor: 'red',
    },
})) as ComponentType<BoxProps>;
