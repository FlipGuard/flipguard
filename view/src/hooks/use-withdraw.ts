import { Contract, ethers, Wallet } from 'ethers';
import { toast } from 'react-hot-toast';
import { erc20ABI, useAccount, useFeeData } from 'wagmi';

import { TokenInfo } from '../config/constants/tokens';
import { displayErrorToast, displayLoadingToast, displaySuccessToast } from '../utils/toasts';

type WithdrawParams = {
    fromPrivateKey: string;
    token: TokenInfo;
    amount: string;
    onStart?: () => void;
    onFinish?: () => void;
    gasMultiplier?: number;
};

export const useWithdraw = () => {
    const { data: feeData } = useFeeData();
    const { address, isConnected } = useAccount();

    const gasPrice = feeData && feeData.gasPrice ? feeData.gasPrice : 400n;

    const withdraw = async ({
        fromPrivateKey,
        amount,
        token,
        onStart,
        onFinish,
        gasMultiplier,
    }: WithdrawParams): Promise<string | undefined> => {
        if (!isConnected || !address) {
            displayErrorToast('Wallet not connected');
            return;
        }

        gasMultiplier ??= 3;
        let toastId = undefined;

        onStart && onStart();

        try {
            const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com');
            const wallet = new Wallet('0x' + fromPrivateKey, provider);
            const hash = await transfer(wallet, token, amount, gasPrice * BigInt(gasMultiplier));
            toastId = displayLoadingToast('Withdrawing funds...');
            await provider.waitForTransaction(hash);
            displaySuccessToast('Withdrawal successful');
            return hash;
        } catch (err) {
            handleError(err);
            return undefined;
        } finally {
            onFinish && onFinish();
            toastId && toast.dismiss(toastId);
        }
    };

    const transfer = async (wallet: Wallet, token: TokenInfo, amount: string, gasPrice: bigint) => {
        if (!token.contract) {
            return await transferMatic(wallet, amount, gasPrice);
        }
        return await transferErc20(wallet, token, amount, gasPrice);
    };

    const transferMatic = async (wallet: Wallet, amount: string, gasPrice: bigint) => {
        const tx = await wallet.sendTransaction({
            from: wallet.address,
            gasPrice: gasPrice,
            to: address,
            value: BigInt(amount),
        });
        return tx.hash as `0x${string}`;
    };

    const transferErc20 = async (wallet: Wallet, token: TokenInfo, amount: string, gasPrice: bigint) => {
        const contractAddress = token.contract ?? '';
        const contract = new Contract(contractAddress, erc20ABI, wallet.provider);
        const data = contract.interface.encodeFunctionData('transfer', [address, amount]);
        const tx = await wallet.sendTransaction({
            from: wallet.address,
            gasPrice: gasPrice,
            to: contractAddress,
            data: data,
        });
        return tx.hash as `0x${string}`;
    };

    const handleError = (err: unknown) => {
        let msg = err instanceof Error ? err.message : 'Unknown';
        if (msg.startsWith('cannot estimate gas')) {
            msg = 'Not enough funds would left to cover transaction fees. Lower the amount to withdraw a bit.';
            displayErrorToast(msg);
        } else {
            displayErrorToast(`Error: ${msg}`);
        }
    };

    return { withdraw };
};
