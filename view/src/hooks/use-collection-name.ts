import { ethers } from 'ethers';
import { erc721ABI, useContractRead } from 'wagmi';

export const useCollectionName = (address: string): string | undefined => {
    const isAddressValid = ethers.utils.isAddress(address);

    const { data: collectionName } = useContractRead({
        address: address as `0x${string}`,
        abi: erc721ABI,
        functionName: 'name',
        enabled: isAddressValid,
    });

    return collectionName;
};

export const useCollectionNames = (addresses: string[]): Record<string, string | undefined> => {
    const names = addresses.map(useCollectionName);
    return Object.fromEntries(names.map((name, idx) => [addresses[idx], name]));
};
