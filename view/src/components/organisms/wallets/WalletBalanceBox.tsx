import { formatNumberForUi } from '@flipguard/commons';
import { Box, BoxProps, styled } from '@mui/material';

import { TokenIcons } from '../../../config/constants/tokens';

const Container = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 0',
});

type Props = BoxProps & {
    balance: number;
    symbol: string;
};

export const WalletBalanceBox = ({ balance, symbol, ...boxProps }: Props) => {
    const icon = TokenIcons[symbol];

    return (
        <Container {...boxProps}>
            <Box>{symbol}</Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box>{formatNumberForUi(balance, false)}</Box>
                {icon && <img alt={symbol} src={icon} style={{ width: '20px', height: '20px', marginLeft: '6px' }} />}
            </Box>
        </Container>
    );
};
