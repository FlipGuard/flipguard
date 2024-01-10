import { DiscordPoolItem } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';

import { DiscordItemComponent } from './DiscordItemComponent';

type Props = {
    item: DiscordPoolItem;
    onDelete: () => void;
};

export const DiscordPoolItemComponent = ({ item, onDelete }: Props) => {
    return (
        <DiscordItemComponent item={item} onDelete={onDelete}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Chance to get:</Typography>
                <Typography>{item.chance}%</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Quantity left:</Typography>
                <Typography>{item.quantity ?? 'Infinite'}</Typography>
            </Box>
        </DiscordItemComponent>
    );
};
