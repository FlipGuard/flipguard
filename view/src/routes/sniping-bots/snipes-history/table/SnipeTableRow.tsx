import { formatNumberForUi } from '@flipguard/commons';
import { AutobuySale, getMarketplaceInfo } from '@flipguard/domain';
import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';

import { CustomLink } from '../../../../components/atoms/navigation/CustomLink';
import { CustomTableCell, CustomTableRow } from '../../../../components/molecules/table/CustomTable';
import { useCollectionName } from '../../../../hooks/use-collection-name';
import { formatTimeAgo } from '../../../../utils/timestamps';

type Props = {
    snipe: AutobuySale;
};

export const SnipeTableRow = ({ snipe }: Props) => {
    const collectionName = useCollectionName(snipe.collection.address) ?? '\u200B';
    const txHash = snipe.meta.txHash ?? '';
    const formattedTxHash = txHash.substring(0, 4) + '...' + txHash.substring(txHash.length - 4);

    return (
        <CustomTableRow>
            <CustomTableCell sx={{ paddingLeft: '12px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', '& .MuiAvatar-colorDefault': { width: '56px' } }}>
                    <Avatar
                        sx={{ margin: '4px 0', borderRadius: '3px', height: '56px', width: 'max-content' }}
                        src={snipe.nft.imageUrl}
                        alt={'?'}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
                        <Typography>{snipe.nft.name}</Typography>
                        <Typography sx={{ fontSize: '14px', color: '#aaa' }}>{collectionName}</Typography>
                    </Box>
                </Box>
            </CustomTableCell>
            <CustomTableCell>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography>{`${snipe.price.uiAmount} ${snipe.price.symbol}`}</Typography>
                    <Typography sx={{ fontSize: '14px', color: '#aaa' }}>
                        ${formatNumberForUi(snipe.price.usdAmount)}
                    </Typography>
                </Box>
            </CustomTableCell>
            <CustomTableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        style={{ marginRight: '8px', borderRadius: '50%' }}
                        src={getMarketplaceInfo(snipe.meta.marketplace).iconUrl}
                        alt={'marketplace-icon'}
                        width={24}
                        height={24}
                    />
                    {snipe.meta.marketplace.name}
                </Box>
            </CustomTableCell>
            <CustomTableCell>
                <CustomLink href={`https://polygonscan.com/tx/${txHash}`} target={'_blank'} rel={'noreferrer'}>
                    {formattedTxHash}
                </CustomLink>
            </CustomTableCell>
            <CustomTableCell>{formatTimeAgo(snipe.meta.txTimestamp)}</CustomTableCell>
        </CustomTableRow>
    );
};
