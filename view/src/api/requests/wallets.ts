import {
    CreateNonceRequest,
    CreateNonceResponse,
    VerifySignatureRequest,
    VerifySignatureResponse,
    WalletChain,
} from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const USER_WALLETS_KEY = 'user-wallets';

export const createNonce = async (chain: WalletChain, body: CreateNonceRequest): Promise<string> => {
    const response = await apiClient.post<CreateNonceResponse>(`/wallets/${chain}/nonce`, body);
    return response.data.nonce;
};

export const verifySignature = async (
    chain: WalletChain,
    body: VerifySignatureRequest,
): Promise<VerifySignatureResponse> => {
    const response = await apiClient.post<VerifySignatureResponse>(`/wallets/${chain}/verify`, body);
    return response.data;
};

export const unlinkWallet = async (chain: WalletChain): Promise<boolean> => {
    const response = await apiClient.post<VerifySignatureResponse>(`/wallets/${chain}/unlink`);
    return response.data.success;
};
