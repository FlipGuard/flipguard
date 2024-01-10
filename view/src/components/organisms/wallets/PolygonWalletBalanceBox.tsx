import { Box, BoxProps } from '@mui/material';

import { useTokensBalance } from '../../../hooks/use-tokens-balance';
import { WalletBalanceBox } from './WalletBalanceBox';

type Props = BoxProps & {
    address: string;
};

export const PolygonWalletBalanceBox = ({ address, ...props }: Props) => {
    const { maticBalance, wethBalance, usdcBalance } = useTokensBalance(address);

    return (
        <Box {...props}>
            <WalletBalanceBox balance={maticBalance} symbol={'MATIC'} />
            <WalletBalanceBox balance={wethBalance} symbol={'WETH'} />
            <WalletBalanceBox balance={usdcBalance} symbol={'USDC'} />
        </Box>
    );
};
