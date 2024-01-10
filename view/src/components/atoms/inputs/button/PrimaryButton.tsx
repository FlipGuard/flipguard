import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { styled, SvgIcon, TooltipProps } from '@mui/material';
import * as React from 'react';

import { useAuth } from '../../../../hooks/use-auth';
import isViewMobile from '../../../../hooks/utils/isViewMobile';
import { FadingTooltip } from '../../feedback/tooltip/FadingTooltip';

const StyledLoadingButton = styled(LoadingButton, {
    shouldForwardProp: (prop) => prop !== 'isDanger',
})<LoadingButtonProps & { isDanger?: boolean }>(({ theme, size, variant, isDanger }) => ({
    backgroundColor: theme.palette.primaryButton.main,
    color: '#fff',
    fontWeight: 400,
    transition: 'none',
    boxShadow: '1',
    '&:hover': {
        backgroundColor: theme.palette.primaryButton.light,
        boxShadow: '2',
    },
    ...((size === undefined || size === 'medium') && {
        padding: '5px 12px',
    }),
    ...(variant === 'outlined' && {
        backgroundColor: 'transparent',
        border: '1px solid',
        color: theme.palette.primaryButton.main,
        borderColor: theme.palette.primaryButton.main,
        '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.primaryButton.light,
            borderColor: theme.palette.primaryButton.light,
            boxShadow: '2',
        },
    }),
    ...(isDanger && {
        backgroundColor: theme.palette.errorButton.main,
        '&:hover': {
            backgroundColor: theme.palette.errorButton.light,
            boxShadow: '2',
        },
    }),
}));

export type PrimaryButtonProps = LoadingButtonProps & {
    icon?: typeof SvgIcon;
    disableOnNoAuth?: boolean;
    tooltipMessage?: string;
    tooltipPlacement?: TooltipProps['placement'];
    isDanger?: boolean;
};

export const PrimaryButton = ({
    icon,
    disableOnNoAuth = false,
    tooltipMessage,
    tooltipPlacement = 'top',
    ...props
}: PrimaryButtonProps) => {
    const isMobile = isViewMobile();
    const { authenticated } = useAuth();

    const Icon = icon;

    const getTooltipMessage = () => {
        if (disableOnNoAuth && !authenticated) {
            return 'You have to sign in first';
        }
        return tooltipMessage !== undefined ? tooltipMessage : '';
    };

    const tooltipMsg = getTooltipMessage();

    if (tooltipMsg) {
        return (
            <FadingTooltip title={tooltipMsg} placement={isMobile ? 'top' : tooltipPlacement}>
                <span>
                    <StyledLoadingButton
                        isDanger={props.isDanger}
                        variant={'contained'}
                        startIcon={Icon ? <Icon /> : null}
                        {...props}
                        disabled={props.disabled || (disableOnNoAuth && !authenticated)}
                    >
                        {/* https://github.com/mui/material-ui/issues/27853 */}
                        <span>{props.children}</span>
                    </StyledLoadingButton>
                </span>
            </FadingTooltip>
        );
    } else {
        return (
            <StyledLoadingButton
                isDanger={props.isDanger}
                variant={'contained'}
                startIcon={Icon ? <Icon /> : null}
                {...props}
                disabled={props.disabled || (disableOnNoAuth && !authenticated)}
            >
                {/* https://github.com/mui/material-ui/issues/27853 */}
                <span>{props.children}</span>
            </StyledLoadingButton>
        );
    }
};
