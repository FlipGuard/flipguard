import { TextFieldProps } from '@mui/material';
import { ethers } from 'ethers';
import React from 'react';

import { CustomTextField } from './CustomTextField';

export const WalletAddressTextField = (props: TextFieldProps) => {
    const value = props.value as string;
    const isError = !!value && !ethers.utils.isAddress(value);
    const helperText = isError ? 'Invalid wallet address' : undefined;

    return <CustomTextField inputProps={{ maxLength: 42 }} error={isError} helperText={helperText} {...props} />;
};
