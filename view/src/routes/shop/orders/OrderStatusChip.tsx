import { OrderStatus } from '@flipguard/webapp-api';
import { Chip } from '@mui/material';

type Props = {
    status: OrderStatus;
};

export const OrderStatusChip = ({ status }: Props) => {
    switch (status) {
        case OrderStatus.PENDING:
            return <PendingStatusChip />;
        case OrderStatus.EXPIRED:
            return <ExpiredStatusChip />;
        case OrderStatus.CANCELLED:
            return <CancelledStatusChip />;
        case OrderStatus.FULFILLED:
            return <FulfilledStatusChip />;
        default:
            return null;
    }
};

const PendingStatusChip = () => {
    return (
        <Chip
            label={'PENDING'}
            sx={{
                color: '#e4b04d',
                background: '#e4b04d55',
            }}
        />
    );
};

const ExpiredStatusChip = () => {
    return (
        <Chip
            label={'EXPIRED'}
            sx={{
                color: '#cacaca',
                background: '#cacaca54',
            }}
        />
    );
};

const CancelledStatusChip = () => {
    return (
        <Chip
            label={'CANCELLED'}
            sx={{
                color: '#cacaca',
                background: '#cacaca54',
            }}
        />
    );
};

const FulfilledStatusChip = () => {
    return (
        <Chip
            label={'FULFILLED'}
            sx={{
                color: '#3fba78',
                background: '#3fba7855',
            }}
        />
    );
};
