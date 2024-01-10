import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getPayouts, PAYOUTS_KEY } from '../../../api/requests/payouts';
import { PayoutsTable } from './payouts/PayoutsTable';

export const AccountReferralPayoutsCard = () => {
    const { isLoading, data: payouts = [] } = useQuery([PAYOUTS_KEY], () => getPayouts());

    if (payouts.length === 0) {
        return null;
    }

    return (
        <Box sx={{ marginTop: '8px' }}>
            <PayoutsTable payouts={payouts} loading={isLoading} />
        </Box>
    );
};
