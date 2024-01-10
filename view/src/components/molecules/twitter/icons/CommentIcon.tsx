import { SvgIcon, SvgIconProps } from '@mui/material';

export const CommentIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon viewBox={'0 0 24 24'} {...props}>
            <path
                d={
                    'M 1.751 10 c 0 -4.42 3.584 -8 8.005 -8 h 4.366 c 4.49 0 8.129 3.64 8.129 8.13 c 0 2.96 -1.607 5.68 -4.196 7.11 l -8.054 4.46 v -3.69 h -0.067 c -4.49 0.1 -8.183 -3.51 -8.183 -8.01 Z m 8.005 -6 c -3.317 0 -6.005 2.69 -6.005 6 c 0 3.37 2.77 6.08 6.138 6.01 l 0.351 -0.01 h 1.761 v 2.3 l 5.087 -2.81 c 1.951 -1.08 3.163 -3.13 3.163 -5.36 c 0 -3.39 -2.744 -6.13 -6.129 -6.13 H 9.756 Z'
                }
            />
        </SvgIcon>
    );
};
