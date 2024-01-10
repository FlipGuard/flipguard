import { stableJsonStringify } from '@flipguard/commons';
import { FlipBotShopItem } from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';

import { CustomDialog, CustomDialogTitle } from '../../../../../components/atoms/feedback/dialog/CustomDialog';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../../components/atoms/inputs/button/TertiaryButton';
import isViewMobile from '../../../../../hooks/utils/isViewMobile';
import { isFlipBotShopItemValid } from '../../../../../utils/shop-items';
import { ShopItemBuilder } from './items/ShopItemBuilder';

type Props = {
    item: FlipBotShopItem;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (value: FlipBotShopItem) => void;
};

export const EditShopItemDialog = ({ item: originalItem, isOpen, onClose, onUpdate }: Props) => {
    const isMobile = isViewMobile('sm');

    const [item, setItem] = useState<FlipBotShopItem>(originalItem);

    const handleUpdate = () => {
        onUpdate(item);
        onClose();
    };

    const areItemsEqual = stableJsonStringify(item) === stableJsonStringify(originalItem);

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
                <ShopItemBuilder
                    type={item.type}
                    setType={() => {}}
                    item={item}
                    setItem={setItem}
                    typeChangeDisabled={true}
                    nameChangeDisabled={true}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', marginTop: '16px' }}>
                <TertiaryButton onClick={onClose}>Cancel</TertiaryButton>
                <PrimaryButton onClick={handleUpdate} disabled={!isFlipBotShopItemValid(item) || areItemsEqual}>
                    Update
                </PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
