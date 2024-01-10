import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Box, BoxProps, styled } from '@mui/material';
import React from 'react';

import { CustomTextField } from '../../components/atoms/inputs/text-field/CustomTextField';

const Container = styled(Box)({
    display: 'flex',
    marginBottom: '16px',
});

type Props = BoxProps & {
    label: string;
    address: string;
    onDelete: () => void;
    onValueChange: (value: string) => void;
};

export const AddressToOutbid = ({ label, address, onDelete, onValueChange, ...boxProps }: Props) => {
    return (
        <Container {...boxProps}>
            <Box sx={{ flexGrow: 1, position: 'relative' }}>
                <HighlightOffOutlinedIcon
                    sx={(theme) => ({
                        color: '#aaa',
                        backgroundColor: theme.palette.primary.main,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        zIndex: 2,
                        position: 'absolute',
                        right: -8,
                        top: -8,
                        '&:hover': {
                            cursor: 'pointer',
                            color: '#ddd',
                        },
                    })}
                    onClick={onDelete}
                />
                <CustomTextField
                    sx={{ width: '100%' }}
                    name={'Address name'}
                    label={label}
                    value={address}
                    onChange={(e) => onValueChange(e.target.value)}
                />
            </Box>
        </Container>
    );
};
