import { SweepContestCollection, SweepContestType } from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Typography } from '@mui/material';
import { ethers } from 'ethers';
import React, { useState } from 'react';

import { CustomDialog } from '../../../components/atoms/feedback/dialog/CustomDialog';
import { FadingTooltip } from '../../../components/atoms/feedback/tooltip/FadingTooltip';
import { PrimaryButton } from '../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../components/atoms/inputs/button/TertiaryButton';
import { CustomNumericTextField } from '../../../components/atoms/inputs/text-field/CustomNumericTextField';
import { ContractAddressTextField } from '../../../components/organisms/sniping-bot/form/ContractAddressTextField';
import isViewMobile from '../../../hooks/utils/isViewMobile';

const ENTRIES_DESCRIPTION = `
    Score the buyer gets on the leaderboard by purchasing any NFT from this collection. 
`;

const INITIAL_CONFIG: SweepContestCollection = {
    address: '',
};

type Props = {
    open: boolean;
    onClose: () => void;
    sweepContestType: SweepContestType;
    addCollection: (collection: SweepContestCollection, entries: number) => void;
};

export const CollectionAddDialog = ({ open, onClose, sweepContestType, addCollection }: Props) => {
    const isMobile = isViewMobile();

    const [collection, setCollection] = useState<SweepContestCollection>(INITIAL_CONFIG);
    const [entries, setEntries] = useState(1);

    const handleClose = () => {
        onClose();
        setCollection(INITIAL_CONFIG);
        setEntries(1);
    };

    const disabled = !ethers.utils.isAddress(collection.address.toLowerCase());

    return (
        <CustomDialog
            sx={{ '& .MuiPaper-root': { width: isMobile ? 'auto' : '520px' } }}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '12px 6px 12px 12px',
                    wordBreak: 'break-word',
                }}
            >
                Add collection
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={handleClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '12px',
                    paddingRight: '16px',
                }}
            >
                <ContractAddressTextField
                    sx={{ margin: '8px 0' }}
                    label={'Contract Address'}
                    address={collection.address}
                    onAddressChange={(addr) => setCollection((prev) => ({ ...prev, address: addr }))}
                />
                {sweepContestType === SweepContestType.QUANTITY && (
                    <CustomNumericTextField
                        sx={{ margin: '8px 0' }}
                        label={'Entries per purchase'}
                        value={entries}
                        onValueChange={setEntries}
                        minValue={1}
                        maxValue={100}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position={'end'}>
                                    <FadingTooltip title={ENTRIES_DESCRIPTION} placement={'top'}>
                                        <HelpOutlineOutlinedIcon
                                            sx={{ color: '#aaa', '&:hover': { cursor: 'auto' } }}
                                        />
                                    </FadingTooltip>
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'space-between',
                    padding: '12px',
                }}
            >
                <TertiaryButton onClick={handleClose}>Cancel</TertiaryButton>
                <PrimaryButton
                    disabled={disabled}
                    onClick={() => {
                        addCollection(collection, entries);
                        handleClose();
                    }}
                >
                    Add
                </PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
