import { Box, BoxProps, FormLabel, useTheme } from '@mui/material';
import React from 'react';

type Props = BoxProps & {
    label?: string;
    show?: boolean;
};

export const InputLikeBox = ({ label = '', show = true, ...props }: Props) => {
    const theme = useTheme();

    if (!show) {
        return <Box>{props.children}</Box>;
    }

    return (
        <Box
            sx={{
                border: `1px solid ${theme.palette.inputBorder.main}`,
                borderRadius: '4px',
                padding: '24px',
                position: 'relative',
                ...(typeof props.sx === 'function' ? props.sx(theme) : props.sx),
            }}
        >
            <FormLabel
                sx={(theme) => ({
                    transform: 'translate(14px, -9px) scale(0.75)',
                    transformOrigin: 'top left',
                    top: '0px',
                    left: '-6px',
                    position: 'absolute',
                    color: theme.palette.inputLabel.main,
                    background: theme.palette.primary.main,
                    padding: '0px 6px',
                    userSelect: 'none',
                })}
            >
                {label}
            </FormLabel>
            {props.children}
        </Box>
    );
};
