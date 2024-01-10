import { formatNumberForUi } from '@flipguard/commons';
import { FlipExecutedGetDto } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { CoinFlipFeedsQueryKeys } from '../../../../api/requests/coinflip-feeds';

type Props = {
    chosenToken: string;
};

export const ProfitBox = ({ chosenToken }: Props) => {
    const { data: noLongerPendingFlips = [] } = useQuery<FlipExecutedGetDto[]>(
        CoinFlipFeedsQueryKeys.userExecutedFlips(),
        () => [],
    );

    const profitForFlip = (f: FlipExecutedGetDto) => {
        if (f.ephemeral || f.pending) {
            return 0;
        } else {
            return f.winAmount - f.betAmount - (f.success ? f.feeAmount : 0);
        }
    };

    const profit = noLongerPendingFlips
        .filter((f) => f.betToken === chosenToken)
        .map(profitForFlip)
        .reduce((a, b) => a + b, 0);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography>Profit</Typography>
            <Typography sx={{ color: profit === 0 ? '#fff' : profit > 0 ? '#69d071' : '#d25050' }}>
                {`${profit > 0 ? '+' : ''}${formatNumberForUi(profit)} ${chosenToken}`}
            </Typography>
        </Box>
    );
};
