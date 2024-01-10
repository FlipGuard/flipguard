import { Box, BoxProps, styled } from '@mui/material';

const KeyboardKey = styled(Box)({
    display: 'inline-block',
    fontFamily: 'Consolas,"Courier New",monospace',
    color: '#ccc',
    background: '#363636',
    textDecoration: 'none',
    textAlign: 'center',
    padding: '2px 4px',
    margin: '0px 6px',
    borderRadius: '4px',
    fontSize: '12px',
});

type Props = BoxProps & {
    text: string;
};

export const KeyboardChip = ({ text, ...boxProps }: Props) => {
    return <KeyboardKey {...boxProps}>{text}</KeyboardKey>;
};
