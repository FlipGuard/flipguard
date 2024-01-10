import { Box, DialogActions, DialogContent, DialogContentText, Typography } from '@mui/material';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { TokenInfo } from '../../../config/constants/tokens';
import { useWithdraw } from '../../../hooks/use-withdraw';
import isViewMobile from '../../../hooks/utils/isViewMobile';
import { ConfirmDialogBase } from '../../atoms/feedback/dialog/ConfirmDialogBase';
import { PrimaryButton } from '../../atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../atoms/inputs/button/TertiaryButton';
import { CustomSelect } from '../../atoms/inputs/select/CustomSelect';
import { CustomNumericTextField } from '../../atoms/inputs/text-field/CustomNumericTextField';
import { CustomTextField } from '../../atoms/inputs/text-field/CustomTextField';

const DEFAULT_OPTIONS: TokenInfo[] = [
    {
        symbol: 'MATIC',
        decimals: 18,
    },
    {
        symbol: 'WETH',
        decimals: 18,
        contract: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    },
    {
        symbol: 'USDC',
        decimals: 6,
        contract: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    },
];

type Props = {
    open: boolean;
    handleClose: () => void;
    balance: Record<string, number>;
    refetchBalance?: () => Promise<void>;
    privateKey: string;
    options?: TokenInfo[];
    customWithdrawFunction?: (amount: number, token: TokenInfo) => Promise<void>;
    isLoading?: boolean;
};

export const WithdrawDialog = ({
    open,
    handleClose,
    balance,
    refetchBalance,
    privateKey,
    options = DEFAULT_OPTIONS,
    customWithdrawFunction,
    isLoading,
}: Props) => {
    const isMobile = isViewMobile('sm');

    const { address: recipient = '' } = useAccount();
    const { withdraw } = useWithdraw();

    const [token, setToken] = useState<TokenInfo>(options[0]);

    const maxAmount = balance[token.symbol] ?? 0;

    const [amount, setAmount] = useState(maxAmount);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setAmount(balance[token.symbol] ?? 0);
    }, [balance, token]);

    const onWithdraw = async () => {
        if (recipient) {
            setLoading(true);

            if (customWithdrawFunction) {
                await customWithdrawFunction(amount, token);
            } else {
                await withdraw({
                    fromPrivateKey: privateKey,
                    amount: ethers.utils.parseUnits(amount.toString(), token.decimals).toString(),
                    token: token,
                });
            }

            setLoading(false);

            refetchBalance && (await refetchBalance());
        }
    };

    return (
        <ConfirmDialogBase isOpen={open} onClose={handleClose} title={`Withdraw funds`}>
            <DialogContent sx={{ padding: '16px 12px 8px 12px' }}>
                <DialogContentText sx={{ marginBottom: '8px' }}>Recipient</DialogContentText>
                <CustomTextField
                    sx={{ width: isMobile ? '100%' : '400px' }}
                    value={recipient.toLowerCase()}
                    disabled={true}
                />
                <DialogContentText sx={{ margin: '16px 0 8px 0' }}>Amount to withdraw</DialogContentText>
                <Box sx={{ display: 'flex' }}>
                    <CustomNumericTextField
                        sx={{ width: '100%' }}
                        value={amount}
                        setValue={setAmount}
                        minValue={0}
                        maxValue={maxAmount}
                    />
                    <CustomSelect
                        sx={{ flexGrow: 1, marginLeft: '4px', minWidth: '120px' }}
                        name={'Asset'}
                        value={token.symbol}
                        onChange={(e) => setToken(options!.find((tk) => tk.symbol === e.target.value) as TokenInfo)}
                        options={options.map(({ symbol }) => ({ label: symbol, value: symbol }))}
                        select
                        required
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '4px',
                    }}
                >
                    <TertiaryButton
                        sx={{
                            padding: '2px 8px',
                            fontSize: '12px',
                            fontWeight: 300,
                            textTransform: 'none',
                        }}
                        onClick={() => setAmount(maxAmount)}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            Max:
                            <Typography
                                sx={(theme) => ({
                                    fontSize: 'inherit',
                                    fontWeight: 'inherit',
                                    color: theme.palette.secondary.main,
                                    marginLeft: '4px',
                                })}
                            >{`${maxAmount.toPrecision(5)}`}</Typography>
                        </Box>
                    </TertiaryButton>
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'end',
                    padding: '12px',
                }}
            >
                <TertiaryButton onClick={handleClose}>Cancel</TertiaryButton>
                <PrimaryButton onClick={onWithdraw} loading={loading || isLoading}>
                    {'Withdraw'}
                </PrimaryButton>
            </DialogActions>
        </ConfirmDialogBase>
    );
};
