import { SvgIcon, SvgIconProps } from '@mui/material';

export const RetweetIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon viewBox={'0 0 24 24'} {...props}>
            <path
                d={
                    'M 4.5 3.88 l 4.432 4.14 l -1.364 1.46 L 5.5 7.55 V 16 c 0 1.1 0.896 2 2 2 H 13 v 2 H 7.5 c -2.209 0 -4 -1.79 -4 -4 V 7.55 L 1.432 9.48 L 0.068 8.02 L 4.5 3.88 Z M 16.5 6 H 11 V 4 h 5.5 c 2.209 0 4 1.79 4 4 v 8.45 l 2.068 -1.93 l 1.364 1.46 l -4.432 4.14 l -4.432 -4.14 l 1.364 -1.46 l 2.068 1.93 V 8 c 0 -1.1 -0.896 -2 -2 -2 Z'
                }
            />
        </SvgIcon>
    );
};
