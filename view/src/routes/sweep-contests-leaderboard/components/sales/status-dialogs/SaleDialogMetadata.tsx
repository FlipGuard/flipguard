import { SweepContestSale } from '@flipguard/webapp-api';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

import { CustomLink } from '../../../../../components/atoms/navigation/CustomLink';
import isViewMobile from '../../../../../hooks/utils/isViewMobile';

type Props = {
    sale: SweepContestSale;
    status: string;
};

export const SaleDialogMetadata = ({ sale, status }: Props) => {
    const isMobile = isViewMobile('sm');

    const seller = sale.seller;
    const buyer = sale.buyer;

    const sellerShort = isMobile ? seller.substring(0, 6) + '...' + seller.substring(seller.length - 6) : seller;
    const buyerShort = isMobile ? buyer.substring(0, 6) + '...' + buyer.substring(buyer.length - 6) : buyer;
    const timeFormat: Intl.DateTimeFormatOptions = { dateStyle: 'short', timeStyle: 'medium' };
    const time = new Intl.DateTimeFormat(undefined, timeFormat).format(sale.transaction.timestamp);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Status:</Typography>
                <Typography>{status}</Typography>
            </Box>
            <Divider sx={{ margin: '8px 0' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Seller:</Typography>
                <CustomLink
                    sx={{ fontSize: '1rem' }}
                    href={`https://polygonscan.com/address/${seller}`}
                    target={'_blank'}
                    rel={'noreferrer'}
                >
                    {sellerShort}
                </CustomLink>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Buyer:</Typography>
                <CustomLink
                    sx={{ fontSize: '1rem' }}
                    href={`https://polygonscan.com/address/${buyer}`}
                    target={'_blank'}
                    rel={'noreferrer'}
                >
                    {buyerShort}
                </CustomLink>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography>Time:</Typography>
                <Typography>{time}</Typography>
            </Box>
        </Box>
    );
};
