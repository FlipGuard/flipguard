import { Dialog, DialogProps, DialogTitle, DialogTitleProps, styled } from '@mui/material';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        marginBottom: '100px',
        backgroundImage: 'none',
        backgroundColor: theme.palette.primary.light,
        borderRadius: '8px',
        border: `1px solid #282828`,
        padding: '6px',
    },
}));

export const CustomDialog = (props: DialogProps) => {
    return <StyledDialog {...props} />;
};

const StyledDialogTitle = styled(DialogTitle)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 6px 12px 12px',
    wordBreak: 'break-all',
});

export const CustomDialogTitle = (props: DialogTitleProps) => {
    return <StyledDialogTitle {...props} />;
};
