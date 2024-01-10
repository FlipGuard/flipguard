import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Box, BoxProps, styled, SvgIconProps } from '@mui/material';
import React from 'react';

const Container = styled(Box)({
    display: 'flex',
    marginBottom: '16px',
});

const StyledIcon = styled(HighlightOffOutlinedIcon)(({ theme }) => ({
    color: '#aaa',
    backgroundColor: theme.palette.primary.main,
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    zIndex: 2,
    position: 'absolute',
    right: -8,
    top: -8,
    '&:hover': {
        cursor: 'pointer',
        color: '#ddd',
    },
}));

type Props = BoxProps & {
    onDelete: () => void;
    hiddenDeleteButton?: boolean;
    iconProps?: SvgIconProps;
};

export const RemovableElement = ({ onDelete, iconProps, ...boxProps }: Props) => {
    return (
        <Container {...boxProps}>
            <Box sx={{ width: '100%', display: 'flex', position: 'relative' }}>
                <StyledIcon {...iconProps} onClick={onDelete} />
                {boxProps.children}
            </Box>
        </Container>
    );
};
