import { CustomDiscordItem } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { RemovableElement } from '../../../atoms/inputs/utils/RemovableElement';

type Props = {
    item: CustomDiscordItem;
    onDelete: () => void;
    children?: ReactNode;
};

export const CustomDiscordItemComponent = ({ item, onDelete, children }: Props) => {
    return (
        <RemovableElement sx={{ width: '100%' }} onDelete={onDelete}>
            <Box sx={{ border: '1px solid #333', borderRadius: '6px', padding: '12px', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Type: </Typography>
                    <Typography>Manual</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Description:</Typography>
                    <Typography>{item.description}</Typography>
                </Box>
                {children}
            </Box>
        </RemovableElement>
    );
};
