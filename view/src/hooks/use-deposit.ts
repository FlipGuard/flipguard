import { toast } from 'react-hot-toast';
import { erc20ABI, useAccount, useFeeData } from 'wagmi';
import { sendTransaction, waitForTransaction, writeContract } from 'wagmi/actions';

import { TokenInfo } from '../config/constants/tokens';
import { displayErrorToast, displayLoadingToast, displaySuccessToast } from '../utils/toasts';

type DepositParams = {
    to: string;
    token: TokenInfo;
    amount: string;
    data?: `0x${string}`;
    onStart?: () => void;
    onFinish?: () => void;
    gasMultiplier?: number;
};

export const useDeposit = () => {
    const { data: feeData } = useFeeData();
    const { address, isConnected } = useAccount();

    const gasPrice = feeData && feeData.gasPrice ? feeData.gasPrice : 400n;

    const deposit = async ({
        to,
        amount,
        token,
        data,
        onStart,
        onFinish,
        gasMultiplier,
    }: DepositParams): Promise<string | undefined> => {
        if (!isConnected || !address) {
            displayErrorToast('Wallet not connected');
            return;
        }

        gasMultiplier ??= 3;
        let toastId = undefined;

        onStart && onStart();

        try {
            const hash = await transfer(to, token, amount, gasPrice * BigInt(gasMultiplier), data);
            toastId = displayLoadingToast('Deposit in progress...');
            await waitForTransaction({ hash });
            displaySuccessToast('Deposit successful');
            return hash;
        } catch (err) {
            handleError(err);
            return undefined;
        } finally {
            onFinish && onFinish();
            toastId && toast.dismiss(toastId);
        }
    };

    const transfer = async (
        to: string,
        token: TokenInfo,
        amount: string,
        gasPrice: bigint,
        data?: `0x${string}`,
    ): Promise<`0x${string}`> => {
        if (!token.contract) {
            return await transferMatic(to, amount, gasPrice, data);
        }
        return await transferErc20(token, to, amount, gasPrice);
    };

    const transferMatic = async (to: string, amount: string, gasPrice: bigint, data?: `0x${string}`) => {
        const { hash } = await sendTransaction({
            chainId: 137,
            account: address,
            to: to,
            gasPrice: gasPrice,
            value: BigInt(amount),
            data: data ?? '0x',
        });
        return hash as `0x${string}`;
    };

    const transferErc20 = async (token: TokenInfo, to: string, amount: string, gasPrice: bigint) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { hash } = await writeContract({
            chainId: 137,
            address: token.contract as `0x${string}`,
            gasPrice: gasPrice,
            abi: erc20ABI,
            functionName: 'transfer',
            args: [to as `0x${string}`, BigInt(amount)],
        });
        return hash as `0x${string}`;
    };

    const handleError = (err: unknown) => {
        const msg = err instanceof Error ? err.message : 'Unknown';
        const formatted = msg.includes('User rejected the request') ? 'User rejected the request' : msg;
        displayErrorToast(`Error: ${formatted}`);
    };

    return { deposit };
};
