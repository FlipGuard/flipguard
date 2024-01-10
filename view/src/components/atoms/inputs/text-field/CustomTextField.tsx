import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { IconButton, styled, TextField, TextFieldProps } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

type StyledTextFieldProps = TextFieldProps & {
    isError?: boolean;
    isMultiline?: boolean;
};

const StyledTextField = styled(TextField, {
    shouldForwardProp: (prop) => !['isError', 'isMultiline'].includes(prop.toString()),
})<StyledTextFieldProps>(({ isError, isMultiline, theme }) => ({
    '& .MuiFormLabel-root': {
        color: theme.palette.inputLabel.main,
    },
    '& .MuiFormLabel-root.Mui-disabled': {
        color: '#666',
    },
    '& .MuiFormLabel-root .Mui-error, & .MuiFormLabel-root.Mui-error': {
        color: theme.palette.error.main,
    },
    '& .MuiFormLabel-root.Mui-focused': {
        color: isError ? theme.palette.error.light : theme.palette.activeInputBorder.main,
        zIndex: 0,
    },
    input: {
        '&::placeholder': {
            color: '#999',
        },
    },
    fieldset: {
        borderColor: theme.palette.inputBorder.main,
    },
    textArea: {
        ...(isMultiline && {
            scrollbarWidth: 'thin',
            scrollbarColor: `${theme.palette.primaryBorder.main} ${theme.palette.primary.dark}`,
            '&::-webkit-scrollbar': {
                width: '0.3em',
                height: '0.3em',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: `${theme.palette.primaryBorder.main}`,
                borderRadius: '999px',
            },
        }),
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: isError ? theme.palette.error.main : theme.palette.inputBorder.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: isError ? theme.palette.error.light : theme.palette.activeInputBorder.main,
            borderWidth: '1px',
        },
    },
    '& .MuiOutlinedInput-root.Mui-disabled fieldset': {
        borderColor: '#444',
    },
    '& .MuiFormHelperText-root': {
        color: isError ? theme.palette.error.main : '#adadad',
    },
}));

type Props = TextFieldProps & {
    showSecret?: boolean;
    setShowSecret?: Dispatch<SetStateAction<boolean>>;
};

export const CustomTextField = ({ showSecret, setShowSecret = () => {}, ...props }: Props) => {
    if (showSecret !== undefined) {
        props.InputProps = {
            endAdornment: (
                <IconButton onClick={() => setShowSecret((prev) => !prev)} sx={{ marginRight: '-8px' }}>
                    {showSecret ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                </IconButton>
            ),
        };
    }

    return (
        <StyledTextField
            variant={'outlined'}
            type={showSecret === undefined || showSecret ? 'text' : 'password'}
            size={'small'}
            autoComplete={'off'}
            isError={!!props.error}
            isMultiline={props.multiline}
            {...props}
        />
    );
};
