import { shorten } from '@flipguard/commons';
import { NftDiscordItem } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { RemovableElement } from '../../../atoms/inputs/utils/RemovableElement';

type Props = {
    item: NftDiscordItem;
    onDelete: () => void;
    children?: ReactNode;
};

export const NftDiscordItemComponent = ({ item, onDelete, children }: Props) => {
    return (
        <RemovableElement sx={{ width: '100%' }} onDelete={onDelete}>
            <Box sx={{ border: '1px solid #333', borderRadius: '6px', padding: '12px', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Type: </Typography>
                    <Typography>NFT</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Token:</Typography>
                    <Typography>{`${item.name} (#${shorten(item.tokenId)})`}</Typography>
                </Box>
                {children}
            </Box>
        </RemovableElement>
    );
};
