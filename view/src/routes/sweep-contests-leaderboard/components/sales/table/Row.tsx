import { formatNumberForUi } from '@flipguard/commons';
import { getMarketplaceInfo } from '@flipguard/domain';
import { SweepContestSaleStatus } from '@flipguard/webapp-api';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import { Avatar, Box, styled, TableCell, Typography } from '@mui/material';
import React from 'react';

import { useSweepContestSetSaleStatusMutation } from '../../../../../api/mutations/sweep-contests';
import { FadingTooltip } from '../../../../../components/atoms/feedback/tooltip/FadingTooltip';
import { TertiaryButton } from '../../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomLink } from '../../../../../components/atoms/navigation/CustomLink';
import { getValidImageUrl } from '../../../../../utils/images';
import { isSaleBanned, isSaleVerified } from '../../../../../utils/sweep-contests';
import { formatTimeAgo } from '../../../../../utils/timestamps';
import { displaySuccessToast } from '../../../../../utils/toasts';
import { SaleStatusIcon } from '../SaleStatusIcon';
import { SalesTableRowContext, SalesTableRowData } from './Virtuoso';

const RowCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#ddd',
    padding: '10px 16px',
    borderTop: `1px solid #282828`,
    borderBottom: 'none',
    height: '70px',
}));

type Props = {
    sale: SalesTableRowData;
    ctx: SalesTableRowContext;
};

export const SalesTableRow = ({ sale, ctx: { sweepContest, isAdminView } }: Props) => {
    const txHash = sale.transaction.hash;
    const formattedTxHash = txHash.substring(0, 4) + '...' + txHash.substring(txHash.length - 4);
    const marketplaceIconUrl = getMarketplaceInfo(sale.marketplace).iconUrl;
    const validImageUrl = getValidImageUrl(sale.nft.imageUrl);

    const setSaleStatusMutation = useSweepContestSetSaleStatusMutation();

    const onBlock = () => {
        setSaleStatusMutation.mutate(
            {
                sweepContestId: sweepContest.id,
                dto: {
                    id: sale.id,
                    status: SweepContestSaleStatus.BLOCKED,
                },
            },
            {
                onSuccess: () => {
                    displaySuccessToast('Sale has been blocked');
                },
            },
        );
    };

    return (
        <>
            <RowCell
                sx={{
                    minWidth: '256px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '& .MuiAvatar-colorDefault': { width: '44px' },
                    }}
                >
                    <Avatar
                        sx={{ margin: '4px 0', borderRadius: '3px', height: '44px', maxWidth: '44px' }}
                        src={validImageUrl}
                        alt={'?'}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
                        <Typography>{sale.nft.name}</Typography>
                        <Typography sx={{ fontSize: '14px', color: '#aaa', marginTop: '-4px' }}>
                            {sale.collectionName}
                        </Typography>
                    </Box>
                    <SaleStatusIcon sweepContest={sweepContest} sale={sale} />
                </Box>
            </RowCell>
            <RowCell sx={{ minWidth: '130px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Typography>{`${formatNumberForUi(sale.price.uiAmount)} ${sale.price.symbol}`}</Typography>
                    <Typography sx={{ fontSize: '14px', color: '#aaa', marginTop: '-4px' }}>
                        ${formatNumberForUi(sale.price.usdAmount, false)}
                    </Typography>
                </Box>
            </RowCell>
            <RowCell sx={{ minWidth: '120px' }}>{sale.sellerShort}</RowCell>
            <RowCell sx={{ minWidth: '120px' }}>{sale.buyerShort}</RowCell>
            <RowCell sx={{ minWidth: '140px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <FadingTooltip title={sale.marketplace.name} placement={'top'}>
                        <Avatar
                            sx={{ borderRadius: '50%', marginRight: '6px', width: '24px', height: '24px' }}
                            src={marketplaceIconUrl}
                            alt={'?'}
                        />
                    </FadingTooltip>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            marginLeft: '8px',
                        }}
                    >
                        <CustomLink href={`https://polygonscan.com/tx/${txHash}`} target={'_blank'} rel={'noreferrer'}>
                            {formattedTxHash}
                        </CustomLink>
                        <Typography sx={{ fontSize: '14px', color: '#aaa', marginTop: '-4px' }}>
                            {formatTimeAgo(sale.transaction.timestamp)}
                        </Typography>
                    </Box>
                </Box>
            </RowCell>
            {isAdminView && (
                <RowCell align={'center'} sx={{ width: '1px' }}>
                    <Box sx={{ height: '20px', borderLeft: '1px solid #282828' }} />
                </RowCell>
            )}
            {isAdminView && (
                <RowCell align={'center'} sx={{ width: '7%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TertiaryButton
                            size={'small'}
                            disabled={isSaleBanned(sale, sweepContest) || isSaleVerified(sale, sweepContest)}
                            loading={setSaleStatusMutation.isLoading}
                            icon={BlockOutlinedIcon}
                            onClick={onBlock}
                            sx={{ background: '#cb3e3eee', '&:hover': { background: '#cb3e3e' } }}
                        >
                            Block
                        </TertiaryButton>
                    </Box>
                </RowCell>
            )}
        </>
    );
};
