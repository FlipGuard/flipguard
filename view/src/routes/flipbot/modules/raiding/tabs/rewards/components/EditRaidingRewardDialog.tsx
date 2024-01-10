import { DiscordPoolItem } from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import equal from 'fast-deep-equal';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { CustomDialog, CustomDialogTitle } from '../../../../../../../components/atoms/feedback/dialog/CustomDialog';
import { PrimaryButton } from '../../../../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../../../../components/atoms/inputs/button/TertiaryButton';
import { DiscordPoolItemBuilder } from '../../../../../../../components/molecules/discord-items/DiscordPoolItemBuilder';
import isViewMobile from '../../../../../../../hooks/utils/isViewMobile';
import { isDiscordPoolItemValid } from '../../../../../../../utils/discord-items';

type Props = {
    rewards: DiscordPoolItem[];
    idx: number;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (value: DiscordPoolItem, idx: number) => void;
};

export const EditRaidingRewardDialog = ({ rewards, idx, isOpen, onClose, onUpdate }: Props) => {
    const isMobile = isViewMobile('sm');

    const [reward, setReward] = useState<DiscordPoolItem | undefined>(rewards[idx]);

    useEffect(() => {
        setReward(rewards[idx]);
    }, [idx]);

    if (!reward) {
        return null;
    }

    const handleUpdate = () => {
        onUpdate(reward, idx);
        onClose();
    };

    return (
        <CustomDialog
            open={isOpen}
            onClose={onClose}
            sx={{ '& .MuiPaper-root': { minWidth: isMobile ? 'auto' : '400px' } }}
        >
            <CustomDialogTitle>
                Update reward
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={onClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </CustomDialogTitle>
            <DialogContent sx={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                <DiscordPoolItemBuilder
                    item={reward}
                    setItem={setReward as Dispatch<SetStateAction<DiscordPoolItem>>}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', marginTop: '16px' }}>
                <TertiaryButton onClick={onClose}>Cancel</TertiaryButton>
                <PrimaryButton
                    onClick={handleUpdate}
                    disabled={!isDiscordPoolItemValid(reward) || equal(reward, rewards[idx])}
                >
                    Update
                </PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
