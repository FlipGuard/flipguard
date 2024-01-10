import { Box, BoxProps, Checkbox, CheckboxProps, styled, Typography } from '@mui/material';
import { ReactNode } from 'react';

const Container = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'checked' && prop !== 'withNoBorder',
})<BoxProps & { checked: boolean; withNoBorder?: boolean }>(({ theme, checked, withNoBorder }) => ({
    borderWidth: withNoBorder ? 'none' : '1px',
    borderStyle: withNoBorder ? 'none' : 'solid',
    borderRadius: withNoBorder ? 'none' : '4px',
    display: 'flex',
    alignItems: 'center',
    padding: '4px 8px',
    color: checked ? '#f5f5f5' : '#666',
    borderColor: checked ? '#f5f5f5' : theme.palette.inputBorder.main,
    '&:hover': {
        cursor: 'pointer',
        color: checked ? '#fff' : '#888',
        borderColor: checked ? '#fff' : theme.palette.inputBorder.light,
    },
}));

type Props = {
    label: ReactNode;
    checked: boolean;
    onChange: (checked: boolean) => void;
    withNoBorder?: boolean;
    boxProps?: BoxProps;
    checkboxProps?: CheckboxProps;
    reversed?: boolean;
};

export const CustomCheckbox = (props: Props) => {
    const { checked, onChange, withNoBorder, reversed } = props;
    const { sx: checkboxSx, ...checkboxRest } = props.checkboxProps ?? { sx: {} };

    const checkbox = (
        <Checkbox
            onClick={() => onChange(!checked)}
            sx={{
                padding: 0,
                color: 'inherit',
                '&.Mui-checked': {
                    color: 'inherit',
                },
                ...checkboxSx,
            }}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
            size={'small'}
            disableRipple
            {...checkboxRest}
        />
    );

    const label =
        typeof props.label === 'string' ? (
            <Typography
                sx={{
                    marginLeft: '6px',
                    color: 'inherit',
                    userSelect: 'none',
                }}
            >
                {props.label}
            </Typography>
        ) : (
            <Box sx={{ marginLeft: '6px' }}>{props.label}</Box>
        );

    return (
        <Container checked={checked} withNoBorder={withNoBorder} onClick={() => onChange(!checked)} {...props.boxProps}>
            {reversed ? (
                <>
                    {label}
                    {checkbox}
                </>
            ) : (
                <>
                    {checkbox}
                    {label}
                </>
            )}
        </Container>
    );
};
