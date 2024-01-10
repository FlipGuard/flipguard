import { Box, styled, SvgIconProps } from '@mui/material';
import { ComponentType } from 'react';

import { FadingTooltip } from '../../../../components/atoms/feedback/tooltip/FadingTooltip';

const BackgroundBox = styled(Box)({
    position: 'absolute',
    width: '40px',
    height: '40px',
    top: -20,
    left: -20,
    transform: 'rotate(45deg)',
});

type ActivityStatusIconProps = {
    title: string;
    icon: ComponentType<SvgIconProps>;
    backgroundColor: string;
    iconColor: string;
    onClick: () => void;
};

export const ActivityStatusIcon = ({ title, icon, backgroundColor, iconColor, onClick }: ActivityStatusIconProps) => {
    const Icon = icon;

    return (
        <>
            <BackgroundBox sx={{ background: backgroundColor }} />
            <FadingTooltip title={title} placement={'top'}>
                <Icon
                    onClick={onClick}
                    sx={{
                        position: 'absolute',
                        color: iconColor,
                        top: 0,
                        left: 0,
                        fontSize: '16px',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    }}
                />
            </FadingTooltip>
        </>
    );
};
