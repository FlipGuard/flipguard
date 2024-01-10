import { Box, BoxProps, Button, styled } from '@mui/material';

const Container = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #333',
    borderRadius: '4px',
    height: '40px',
    overflow: 'hidden',
    '& button:last-child': {
        borderRight: 'none',
    },
});

const CustomButton = styled(Button)(({ disabled }) => ({
    color: disabled ? `#fff !important` : '#999',
    background: disabled ? '#333' : 'auto',
    fontWeight: 400,
    borderRadius: 0,
    borderRight: '1px solid #333',
    minWidth: '48px',
    height: '40px',
    ...(!disabled && {
        '&:hover': {
            color: '#ccc',
        },
    }),
}));

type Props<T extends string> = BoxProps & {
    values: readonly T[];
    value: T;
    onRangeChange: (v: T) => void;
};

export const RangePickButton = <T extends string>({ values, value, onRangeChange, ...boxProps }: Props<T>) => {
    return (
        <Container {...boxProps}>
            {values.map((v, idx) => (
                <CustomButton
                    key={idx}
                    disabled={v === value}
                    onClick={() => {
                        if (v !== value) {
                            onRangeChange(v);
                        }
                    }}
                >
                    {v}
                </CustomButton>
            ))}
        </Container>
    );
};
