import { SvgIcon, SvgIconProps } from '@mui/material';

export const ShareIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon viewBox={'0 0 24 24'} {...props}>
            <path
                d={
                    'M 12 2.59 l 5.7 5.7 l -1.41 1.42 L 13 6.41 V 16 h -2 V 6.41 l -3.3 3.3 l -1.41 -1.42 L 12 2.59 Z M 21 15 l -0.02 3.51 c 0 1.38 -1.12 2.49 -2.5 2.49 H 5.5 C 4.11 21 3 19.88 3 18.5 V 15 h 2 v 3.5 c 0 0.28 0.22 0.5 0.5 0.5 h 12.98 c 0.28 0 0.5 -0.22 0.5 -0.5 L 19 15 h 2 Z'
                }
            />
        </SvgIcon>
    );
};
