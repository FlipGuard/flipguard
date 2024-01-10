import { styled } from '@mui/material';

import { PrimaryButton, PrimaryButtonProps } from './PrimaryButton';

const CustomButton = styled(PrimaryButton)(({ theme, isDanger }) => ({
    backgroundColor: theme.palette.tertiaryButton.main,
    boxShadow: '1',
    '&:hover': {
        backgroundColor: theme.palette.tertiaryButton.light,
        boxShadow: '2',
    },
    ...(isDanger && {
        backgroundColor: theme.palette.errorButton.main,
        '&:hover': {
            backgroundColor: theme.palette.errorButton.light,
            boxShadow: '2',
        },
    }),
}));

type Props = PrimaryButtonProps;

export const TertiaryButton = ({ ...props }: Props) => {
    return <CustomButton {...props} />;
};
