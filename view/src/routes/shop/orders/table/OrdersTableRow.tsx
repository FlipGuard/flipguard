import { bigintToNumber } from '@flipguard/commons';
import { OrderGetDto, OrderStatus } from '@flipguard/webapp-api';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { IconButton, Stack } from '@mui/material';
import { useState } from 'react';

import { FadingTooltip } from '../../../../components/atoms/feedback/tooltip/FadingTooltip';
import { CustomLink } from '../../../../components/atoms/navigation/CustomLink';
import { CustomTableCell, CustomTableRow } from '../../../../components/molecules/table/CustomTable';
import { formatTimeAgo } from '../../../../utils/timestamps';
import { CancelOrderDialog } from '../CancelOrderDialog';
import { OrderStatusChip } from '../OrderStatusChip';
import { VerifyOrderDialog } from '../VerifyOrderDialog';

type Props = {
    order: OrderGetDto;
    cancelDisabled: boolean;
};

export const OrdersTableRow = ({ order, cancelDisabled }: Props) => {
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);

    const orderIdShort = order.id.substring(0, 8);
    const itemName = order.item.name + (order.metadata.isTrial ? ' (TRIAL)' : '');
    const uiAmount = bigintToNumber(BigInt(order.price.amount), order.price.currency.decimals);
    const currency = order.price.currency.symbol;

    const txHash = order.fulfillment.txHash ?? '-';
    const txHashShort = txHash === '-' ? '-' : txHash.substring(0, 6) + '...' + txHash.slice(-6);
    const price = order.metadata.isTrial ? '-' : `${uiAmount} ${currency}`;

    const buttonsDisabled = order.status !== OrderStatus.PENDING;

    return (
        <CustomTableRow>
            <CustomTableCell
                align={'center'}
                sx={{
                    paddingLeft: '16px',
                    textOverflow: 'ellipsis',
                    maxWidth: '256px',
                    overflow: 'hidden',
                }}
            >
                {orderIdShort}
            </CustomTableCell>
            <CustomTableCell align={'center'}>{itemName}</CustomTableCell>
            <CustomTableCell align={'center'}>{price}</CustomTableCell>
            <CustomTableCell align={'center'}>
                {txHash === '-' ? (
                    txHash
                ) : (
                    <CustomLink
                        href={`https://polygonscan.com/tx/${txHash}`}
                        target={'_blank'}
                        rel={'noreferrer'}
                        sx={{ paddingLeft: '12px', fontSize: '13px' }}
                    >
                        {txHashShort}
                    </CustomLink>
                )}
            </CustomTableCell>
            <CustomTableCell align={'center'}>
                <OrderStatusChip status={order.status} />
            </CustomTableCell>
            <CustomTableCell align={'center'}>{formatTimeAgo(getUpdatedAt(order))}</CustomTableCell>
            <CustomTableCell align={'center'}>
                <Stack direction={'row'} justifyContent={'center'}>
                    <FadingTooltip title={buttonsDisabled ? '' : 'Verify using transaction hash'} placement={'top'}>
                        <span>
                            <IconButton
                                sx={{ color: '#fff' }}
                                disabled={buttonsDisabled}
                                onClick={() => setVerifyDialogOpen(true)}
                            >
                                <ReceiptLongOutlinedIcon />
                            </IconButton>
                        </span>
                    </FadingTooltip>
                    <FadingTooltip title={buttonsDisabled ? '' : 'Cancel'} placement={'top'}>
                        <span>
                            <IconButton
                                sx={{ color: '#fff' }}
                                disabled={buttonsDisabled || cancelDisabled}
                                onClick={() => setCancelDialogOpen(true)}
                            >
                                <CancelOutlinedIcon />
                            </IconButton>
                        </span>
                    </FadingTooltip>
                </Stack>
            </CustomTableCell>
            <VerifyOrderDialog
                orderId={order.id}
                open={verifyDialogOpen}
                handleClose={() => setVerifyDialogOpen(false)}
            />
            <CancelOrderDialog
                orderId={order.id}
                open={cancelDialogOpen}
                handleClose={() => setCancelDialogOpen(false)}
            />
        </CustomTableRow>
    );
};

const getUpdatedAt = (order: OrderGetDto) => {
    switch (order.status) {
        case OrderStatus.PENDING:
            return order.createdAt;
        case OrderStatus.CANCELLED:
            return order.cancelledAt;
        case OrderStatus.FULFILLED:
            return order.fulfilledAt;
        case OrderStatus.EXPIRED:
            return order.expiresAt;
        default:
            return order.createdAt;
    }
};
