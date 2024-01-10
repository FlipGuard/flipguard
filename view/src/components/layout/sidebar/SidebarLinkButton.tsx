import { Box, BoxProps, Button, Chip, styled, SvgIconProps, Typography } from '@mui/material';
import { ComponentType } from 'react';
import { useLocation } from 'wouter';

import { RoutePath } from '../../../config/constants/navigation';
import { FadingTooltip } from '../../atoms/feedback/tooltip/FadingTooltip';

const Container = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'active' && prop !== 'disabled',
})<BoxProps & { active: boolean; disabled: boolean }>(({ theme, active, disabled }) => ({
    height: '34px',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    borderRadius: '6px',
    border: '1px solid transparent',
    margin: '0 16px 6px 16px',
    '& svg': {
        color: theme.palette.tertiary.dark,
        opacity: disabled ? 0.7 : 1,
    },
    '& button': {
        minWidth: 0,
        color: '#81807f',
    },
    ...(!disabled && {
        '&:hover': {
            cursor: 'pointer',
            background: '#45495260',
            '& svg': {
                color: theme.palette.tertiary.main,
            },
            '& button': {
                minWidth: 0,
                color: '#fff',
            },
        },
    }),
    ...(active && {
        background: '#45495260',
        '& svg': {
            color: theme.palette.tertiary.main,
        },
        '& button': {
            minWidth: 0,
            color: '#fff',
        },
    }),
}));

export type SidebarLinkButtonProps = {
    name: string;
    icon?: ComponentType<SvgIconProps>;
    path?: RoutePath;
    isGroup?: boolean;
    active?: boolean;
    disabled?: boolean;
    chipLabel?: 'FREE' | 'HOT';
    onLinkClick?: () => void;
};

export const SidebarLinkButton = ({
    name,
    icon,
    path,
    isGroup,
    active,
    disabled,
    chipLabel,
    onLinkClick = () => {},
}: SidebarLinkButtonProps) => {
    const [location, setLocation] = useLocation();

    if (!icon) {
        return (
            <Box sx={{ margin: '16px 0px 6px 0px', paddingBottom: '2px' }}>
                <Typography sx={{ fontSize: '14px', marginLeft: '18px', color: '#fff', fontWeight: 400 }}>
                    {name}
                </Typography>
            </Box>
        );
    }

    const Icon = icon;
    const isActive = (() => {
        if (active !== undefined) {
            return active;
        }

        return path ? (path === RoutePath.Dashboard ? path === location : location.startsWith(path)) : false;
    })();

    return (
        <FadingTooltip title={isGroup ? name : undefined} placement={'right'}>
            <Container
                active={isActive}
                disabled={!!disabled}
                onClick={() => {
                    if (!disabled) {
                        path && setLocation(path);
                        onLinkClick();
                    }
                }}
            >
                <Icon sx={{ fontSize: '22px', margin: '0 8px' }} />
                {!isGroup && (
                    <Button
                        disabled={disabled}
                        sx={{
                            marginLeft: '-8px',
                            fontSize: '14px',
                            fontWeight: 400,
                            marginRight: '4px',
                            transition: 'none',
                            textTransform: 'none',
                            '&:hover': { backgroundColor: 'transparent' },
                        }}
                        disableTouchRipple
                    >
                        {name}
                    </Button>
                )}
                {chipLabel && (
                    <Chip
                        sx={{
                            marginLeft: '-4px',
                            borderRadius: '4px',
                            height: '18px',
                            fontSize: '10px',
                            '& span': { padding: '0px 4px' },
                            ...(chipLabel === 'HOT' && {
                                backgroundColor: '#ffd045',
                                backgroundImage: 'linear-gradient(315deg, #ff9645 0%, #d14545 74%)',
                            }),
                            ...(chipLabel === 'FREE' && {
                                backgroundColor: '#5078f2',
                                backgroundImage: 'linear-gradient(315deg, #4463c2 0%, #5484dc 74%)',
                            }),
                        }}
                        label={chipLabel}
                    />
                )}
            </Container>
        </FadingTooltip>
    );
};
