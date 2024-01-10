import { TextFieldProps } from '@mui/material';
import { ethers } from 'ethers';
import React from 'react';
import { erc20ABI, useContractRead } from 'wagmi';

import { CustomTextField } from './CustomTextField';

export const Erc20TokenAddressTextField = (props: TextFieldProps) => {
    const value = props.value as string;
    const isAddressValid = ethers.utils.isAddress(value);
    const isError = !!value && !isAddressValid;

    const { data: tokenName } = useContractRead({
        address: value as `0x${string}`,
        abi: erc20ABI,
        functionName: 'name',
        enabled: isAddressValid,
    });

    const helperText = isError ? 'Invalid token address' : tokenName || undefined;

    return <CustomTextField inputProps={{ maxLength: 42 }} error={isError} helperText={helperText} {...props} />;
};
