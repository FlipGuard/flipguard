import { FlipBotShopItem } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';

import { RoleDiscordItemComponent } from '../../../../../../components/molecules/discord-items/components/RoleDiscordItemComponent';

type Props = {
    item: FlipBotShopItem;
    onDelete: () => void;
};

export const ShopItemComponent = ({ item, onDelete }: Props) => {
    return (
        <RoleDiscordItemComponent item={item} onDelete={onDelete}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Name:</Typography>
                <Typography sx={{ textWrap: 'nowrap' }}>{item.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Description:</Typography>
                <Typography sx={{ textWrap: 'nowrap' }}>{item.description}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Quantity left:</Typography>
                <Typography>{item.quantity ?? 'Infinite'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Burn tokens:</Typography>
                <Typography sx={{ color: item.sendToBurnAddress ? '#f13e33' : 'auto' }}>
                    {item.sendToBurnAddress ? 'YES' : 'NO'}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Price:</Typography>
                <Typography>{`${item.priceAmount} ${item.priceSymbol}`}</Typography>
            </Box>
        </RoleDiscordItemComponent>
    );
};
