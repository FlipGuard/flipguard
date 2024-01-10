import { Box, DialogActions, DialogContent, DialogContentText, Typography } from '@mui/material';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';

import { TokenInfo } from '../../../config/constants/tokens';
import { useDeposit } from '../../../hooks/use-deposit';
import { ConfirmDialogBase } from '../../atoms/feedback/dialog/ConfirmDialogBase';
import { PrimaryButton } from '../../atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../atoms/inputs/button/TertiaryButton';
import { CustomSelect } from '../../atoms/inputs/select/CustomSelect';
import { CustomNumericTextField } from '../../atoms/inputs/text-field/CustomNumericTextField';

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
    recipient: string;
    refetchBurnerBalance?: () => Promise<void>;
    options?: TokenInfo[];
};

export const DepositDialog = ({
    open,
    handleClose,
    recipient,
    refetchBurnerBalance,
    options = DEFAULT_OPTIONS,
}: Props) => {
    const { deposit } = useDeposit();
    const { address: sender } = useAccount();

    const [token, setToken] = useState<TokenInfo>(options[0]);

    const { data: balance, refetch: refetchBalance } = useBalance({
        address: sender,
        chainId: 137,
        token: token.contract as `0x${string}` | undefined,
    });

    const maxAmount = Number(balance ? balance.formatted : 0);

    const [amount, setAmount] = useState(maxAmount);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (balance) {
            setAmount(Number(balance ? balance.formatted : 0));
        }
    }, [balance]);

    const onDeposit = async () => {
        if (balance) {
            await deposit({
                to: recipient,
                token: token,
                amount: ethers.utils.parseUnits(amount.toString(), balance.decimals).toString(),
                onStart: () => setLoading(true),
                onFinish: () => setLoading(false),
            });
            await refetchBalance();
            refetchBurnerBalance && (await refetchBurnerBalance());
        }
    };

    return (
        <ConfirmDialogBase isOpen={open} onClose={handleClose} title={`Deposit funds`}>
            <DialogContent sx={{ padding: '16px 12px 8px 12px' }}>
                <DialogContentText sx={{ marginBottom: '8px' }}>Amount to deposit</DialogContentText>
                <Box sx={{ display: 'flex' }}>
                    <CustomNumericTextField
                        sx={{ flexGrow: 1 }}
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
                            >{`${maxAmount}`}</Typography>
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
                <PrimaryButton onClick={onDeposit} loading={loading}>
                    {'Deposit'}
                </PrimaryButton>
            </DialogActions>
        </ConfirmDialogBase>
    );
};
