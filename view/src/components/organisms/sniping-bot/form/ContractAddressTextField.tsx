import { TextFieldProps } from '@mui/material';
import { ethers } from 'ethers';
import React from 'react';

import { useCollectionName } from '../../../../hooks/use-collection-name';
import { CustomTextField } from '../../../atoms/inputs/text-field/CustomTextField';

type Props = TextFieldProps & {
    address: string;
    onAddressChange: (address: string) => void;
};

export const ContractAddressTextField = ({ address, onAddressChange, ...props }: Props) => {
    const collectionName = useCollectionName(address);

    const isContractAddressValid = address === '' || ethers.utils.isAddress(address);

    return (
        <CustomTextField
            name={'Contract Address'}
            label={'Contract Address'}
            placeholder={'0x09421f533497331e1075fdca2a16e9ce3f52312b'}
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            required
            inputProps={{ maxLength: 64 }}
            helperText={
                isContractAddressValid ? `Collection name: ${collectionName ?? '?'}` : 'Invalid contract address'
            }
            error={!isContractAddressValid}
            {...props}
        />
    );
};
