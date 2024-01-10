import { Box, ClickAwayListener } from '@mui/material';
import React, { useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';

type Props = {
    color: string;
    onChange: (color: string) => void;
};

export const ColorPicker = ({ color, onChange }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                }}
            >
                <Box
                    sx={{
                        border: '1px solid ${color}',
                        backgroundColor: color,
                        width: '32px',
                        height: '32px',
                        borderRadius: '4px',
                    }}
                    onClick={() => setIsOpen(true)}
                />
                {isOpen && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: -194,
                            right: 0,
                            left: 42,
                            bottom: 0,
                            zIndex: 2,
                            '& > input': {
                                width: '200px',
                                border: '1px solid #555',
                                borderRadius: '2px',
                                fontSize: '14px',
                                height: '26px',
                                color: '#eee',
                                outline: 'none',
                                '&:focus': {
                                    border: '1px solid #999',
                                },
                            },
                            '& .react-colorful__hue': {
                                borderRadius: '0 0 2px 2px',
                            },
                        }}
                    >
                        <HexColorPicker color={color} onChange={onChange} />
                        <HexColorInput color={color} onChange={onChange} alpha prefixed />
                    </Box>
                )}
            </Box>
        </ClickAwayListener>
    );
};
