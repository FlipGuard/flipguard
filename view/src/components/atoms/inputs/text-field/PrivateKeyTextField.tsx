import { TextFieldProps } from '@mui/material';
import React, { useState } from 'react';

import { getPublicAddressFromPkey } from '../../../../utils/wallets';
import { CustomTextField } from './CustomTextField';

type Props = TextFieldProps & {
    showPublicKey?: boolean;
};

export const PrivateKeyTextField = ({ showPublicKey, ...props }: Props) => {
    const value = props.value as string;

    const [showSecret, setShowSecret] = useState(false);

    const publicAddress = getPublicAddressFromPkey(value);
    const isError = !!value && !publicAddress;
    const helperText = isError ? 'Invalid private key' : `Public address: ${publicAddress || '?'}`;

    return (
        <CustomTextField
            inputProps={{ maxLength: 64 }}
            showSecret={showSecret}
            setShowSecret={setShowSecret}
            error={isError}
            helperText={showPublicKey ? helperText : ''}
            {...props}
        />
    );
};
