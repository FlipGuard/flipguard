import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Box, TextFieldProps } from '@mui/material';
import React from 'react';

import { CustomTextField } from '../../../../../atoms/inputs/text-field/CustomTextField';

type Props = TextFieldProps & {
    closeable: boolean;
    onClose: () => void;
};

export const CloseableTextInput = ({ closeable, onClose, ...props }: Props) => {
    return (
        <Box sx={{ position: 'relative' }}>
            {closeable && (
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
                        top: 8,
                        '&:hover': {
                            cursor: 'pointer',
                            color: '#ddd',
                        },
                    })}
                    onClick={onClose}
                />
            )}
            <CustomTextField {...props} />
        </Box>
    );
};
