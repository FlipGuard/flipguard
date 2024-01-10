import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';
import { Link, LinkProps, styled } from '@mui/material';
import React from 'react';

const StyledLink = styled(Link, {
    shouldForwardProp: (prop) => prop !== 'customColor',
})<LinkProps & { customColor?: string }>(({ theme, customColor }) => ({
    textDecoration: 'none',
    fontSize: '14px',
    color: customColor ? customColor : '#5dabd2',
    '&:hover': {
        textDecoration: 'underline',
        color: customColor ? customColor : theme.palette.tertiary.main,
        '& svg': {
            color: customColor ? customColor : theme.palette.tertiary.main,
        },
    },
}));

type Props = LinkProps & {
    hideArrow?: boolean;
    customColor?: string;
};

export const CustomLink = ({ hideArrow, customColor, ...props }: Props) => {
    return (
        <StyledLink {...props} customColor={customColor}>
            {props.children}
            {!hideArrow && (
                <ArrowOutwardOutlinedIcon
                    sx={{
                        color: customColor ? customColor : '#5dabd2',
                        fontSize: '13px',
                        margin: '-4px 0 0 2px',
                    }}
                />
            )}
        </StyledLink>
    );
};
