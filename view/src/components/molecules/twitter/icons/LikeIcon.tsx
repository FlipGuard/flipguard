import { SvgIcon, SvgIconProps } from '@mui/material';

export const LikeIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon viewBox={'0 0 24 24'} {...props}>
            <path
                d={
                    'M 16.697 5.5 c -1.222 -0.06 -2.679 0.51 -3.89 2.16 l -0.805 1.09 l -0.806 -1.09 C 9.984 6.01 8.526 5.44 7.304 5.5 c -1.243 0.07 -2.349 0.78 -2.91 1.91 c -0.552 1.12 -0.633 2.78 0.479 4.82 c 1.074 1.97 3.257 4.27 7.129 6.61 c 3.87 -2.34 6.052 -4.64 7.126 -6.61 c 1.111 -2.04 1.03 -3.7 0.477 -4.82 c -0.561 -1.13 -1.666 -1.84 -2.908 -1.91 Z m 4.187 7.69 c -1.351 2.48 -4.001 5.12 -8.379 7.67 l -0.503 0.3 l -0.504 -0.3 c -4.379 -2.55 -7.029 -5.19 -8.382 -7.67 c -1.36 -2.5 -1.41 -4.86 -0.514 -6.67 c 0.887 -1.79 2.647 -2.91 4.601 -3.01 c 1.651 -0.09 3.368 0.56 4.798 2.01 c 1.429 -1.45 3.146 -2.1 4.796 -2.01 c 1.954 0.1 3.714 1.22 4.601 3.01 c 0.896 1.81 0.846 4.17 -0.514 6.67 Z'
                }
            />
        </SvgIcon>
    );
};
