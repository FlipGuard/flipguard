import { DiscordItemType, DiscordPoolItem } from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { CustomDialog, CustomDialogTitle } from '../../../../../../../components/atoms/feedback/dialog/CustomDialog';
import { PrimaryButton } from '../../../../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomSelect } from '../../../../../../../components/atoms/inputs/select/CustomSelect';
import { DiscordPoolItemBuilder } from '../../../../../../../components/molecules/discord-items/DiscordPoolItemBuilder';
import isViewMobile from '../../../../../../../hooks/utils/isViewMobile';
import { getDefaultDiscordPoolItemForType, isDiscordPoolItemValid } from '../../../../../../../utils/discord-items';

const DEFAULT_TYPE = DiscordItemType.TOKEN;

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (value: DiscordPoolItem) => void;
};

export const AddRaidingRewardDialog = ({ isOpen, onClose, onAdd }: Props) => {
    const isMobile = isViewMobile('sm');

    const [type, setType] = useState<DiscordItemType>(DEFAULT_TYPE);
    const [reward, setReward] = useState<DiscordPoolItem>(getDefaultDiscordPoolItemForType(DEFAULT_TYPE));

    useEffect(() => {
        setReward(getDefaultDiscordPoolItemForType(type));
    }, [isOpen, type]);

    const handleAdd = () => {
        onAdd(reward);
        onClose();
        setType(DEFAULT_TYPE);
        setReward(getDefaultDiscordPoolItemForType(DEFAULT_TYPE));
    };

    return (
        <CustomDialog
            open={isOpen}
            onClose={onClose}
            sx={{ '& .MuiPaper-root': { minWidth: isMobile ? 'auto' : '400px' } }}
        >
            <CustomDialogTitle>
                Add reward
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={onClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </CustomDialogTitle>
            <DialogContent sx={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                <CustomSelect
                    sx={{ margin: '8px' }}
                    label={'Reward type'}
                    options={[{ label: 'Token', value: DiscordItemType.TOKEN }]}
                    value={type}
                    onChange={(e) => setType(e.target.value as DiscordItemType)}
                    select
                />
                <DiscordPoolItemBuilder item={reward} setItem={setReward} />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', marginTop: '16px' }}>
                <TertiaryButton onClick={onClose}>Cancel</TertiaryButton>
                <PrimaryButton onClick={handleAdd} disabled={!isDiscordPoolItemValid(reward)}>
                    Add
                </PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
