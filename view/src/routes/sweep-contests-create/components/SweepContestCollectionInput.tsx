import { Grid } from '@mui/material';
import React from 'react';

import { CustomNumericTextField } from '../../../components/atoms/inputs/text-field/CustomNumericTextField';
import { CustomTextField } from '../../../components/atoms/inputs/text-field/CustomTextField';
import { RemovableElement } from '../../../components/atoms/inputs/utils/RemovableElement';
import { ContractAddressTextField } from '../../../components/organisms/sniping-bot/form/ContractAddressTextField';

type Props = {
    label: string;
    address: string;
    onAddressChange: (address: string) => void;
    entriesApplicable: boolean;
    entries: number;
    onEntriesChange: (entries: number) => void;
    removable: boolean;
    onRemove: () => void;
};

export const SweepContestCollectionInput = ({
    label,
    address,
    onAddressChange,
    entriesApplicable,
    entries,
    onEntriesChange,
    removable,
    onRemove,
}: Props) => {
    return (
        <RemovableElement sx={{ margin: '8px' }} onDelete={onRemove} hiddenDeleteButton={!removable}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8} md={8} lg={6} xl={6} sx={{ display: 'flex' }}>
                    <ContractAddressTextField
                        sx={{ flexGrow: 1 }}
                        label={label}
                        address={address}
                        onAddressChange={onAddressChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={6} xl={6} sx={{ display: 'flex' }}>
                    {entriesApplicable ? (
                        <CustomNumericTextField
                            sx={{ flexGrow: 1 }}
                            label={'Entries per purchase'}
                            value={entries}
                            onValueChange={onEntriesChange}
                            minValue={1}
                            maxValue={1000}
                        />
                    ) : (
                        <CustomTextField
                            sx={{ flexGrow: 1 }}
                            label={'Entries per purchase'}
                            value={'N/A'}
                            disabled={true}
                        />
                    )}
                </Grid>
            </Grid>
        </RemovableElement>
    );
};
