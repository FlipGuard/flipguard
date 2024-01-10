import { Wallet } from 'ethers';

export const getPublicAddressFromPkey = (privateKey: string) => {
    try {
        const wallet = new Wallet('0x' + privateKey);
        return wallet.address;
    } catch (err) {
        return '';
    }
};
