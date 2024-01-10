import { DiscordItemType, FlipBotShopItem } from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { CustomDialog, CustomDialogTitle } from '../../../../../components/atoms/feedback/dialog/CustomDialog';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../../components/atoms/inputs/button/TertiaryButton';
import isViewMobile from '../../../../../hooks/utils/isViewMobile';
import { getDefaultFlipBotShopItemForType, isFlipBotShopItemValid } from '../../../../../utils/shop-items';
import { ShopItemBuilder } from './items/ShopItemBuilder';

const DEFAULT_TYPE = DiscordItemType.ROLE;

type Props = {
    reservedNames: string[];
    isOpen: boolean;
    onClose: () => void;
    onAdd: (value: FlipBotShopItem) => void;
};

export const AddShopItemDialog = ({ reservedNames, isOpen, onClose, onAdd }: Props) => {
    const isMobile = isViewMobile('sm');

    const [type, setType] = useState<DiscordItemType>(DEFAULT_TYPE);
    const [item, setItem] = useState<FlipBotShopItem>(getDefaultFlipBotShopItemForType(DEFAULT_TYPE));

    useEffect(() => {
        if (!isOpen) {
            setItem(getDefaultFlipBotShopItemForType(type));
        } else {
            setItem({
                ...getDefaultFlipBotShopItemForType(type),
                name: item.name,
                description: item.description,
                priceSymbol: item.priceSymbol,
                priceAmount: item.priceAmount,
            });
        }
    }, [isOpen, type]);

    const handleAdd = () => {
        onAdd(item);
        onClose();
        setType(DEFAULT_TYPE);
        setItem(getDefaultFlipBotShopItemForType(DEFAULT_TYPE));
    };

    const nameIsTaken = reservedNames.includes(item.name);

    return (
        <CustomDialog
            open={isOpen}
            onClose={onClose}
            sx={{ '& .MuiPaper-root': { minWidth: isMobile ? 'auto' : '400px' } }}
        >
            <CustomDialogTitle>
                Add shop item
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={onClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </CustomDialogTitle>
            <DialogContent sx={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                <ShopItemBuilder
                    reservedNames={reservedNames}
                    type={type}
                    setType={setType}
                    item={item}
                    setItem={setItem}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', marginTop: '16px' }}>
                <TertiaryButton onClick={onClose}>Cancel</TertiaryButton>
                <PrimaryButton onClick={handleAdd} disabled={!isFlipBotShopItemValid(item) || nameIsTaken}>
                    Add
                </PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
