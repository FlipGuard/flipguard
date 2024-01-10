import { FlipBotModuleShopSettings, FlipBotModuleShopSettingsUpdateDto } from '@flipguard/webapp-api';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Card, styled, Typography } from '@mui/material';
import equal from 'fast-deep-equal';
import React, { useEffect, useState } from 'react';

import { useShopModuleSettingsUpdateMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { AddElementButton } from '../../../../../components/atoms/inputs/button/AddElementButton';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { HeaderBox } from '../../../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../../../components/atoms/utils/HeaderText';
import { displaySuccessToast } from '../../../../../utils/toasts';
import { AddShopItemDialog } from '../components/AddShopItemDialog';
import { EditShopItemDialog } from '../components/EditShopItemDialog';
import { ShopItemComponent } from '../components/items/ShopItemComponent';

const StyledEditIcon = styled(ModeEditOutlineOutlinedIcon)(({ theme }) => ({
    color: '#aaa',
    backgroundColor: theme.palette.primary.main,
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    zIndex: 2,
    position: 'absolute',
    right: 16,
    top: -8,
    '&:hover': {
        cursor: 'pointer',
        color: '#ddd',
    },
}));

type Props = {
    configId: string;
    config: FlipBotModuleShopSettings;
};

export const ShopItemsTab = ({ configId, config }: Props) => {
    const updateMutation = useShopModuleSettingsUpdateMutation();

    const [items, setItems] = useState(config.items);
    const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
    const [updatedItemName, setUpdatedItemName] = useState('');

    useEffect(() => {
        setItems(config.items);
    }, [JSON.stringify(config.items)]);

    const onSave = () => {
        const dto: FlipBotModuleShopSettingsUpdateDto = {
            items: items,
        };

        updateMutation.mutate(
            { configId, dto },
            {
                onSuccess: () => {
                    displaySuccessToast('Settings has been updated');
                },
            },
        );
    };

    const saveDisabled = equal(items, config.items);

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
            }}
        >
            <HeaderBox sx={{ marginTop: 0 }}>
                <LocalOfferOutlinedIcon />
                <HeaderText>{'Items'}</HeaderText>
            </HeaderBox>
            <Box sx={{ margin: '8px', display: 'flex', flexDirection: 'column' }}>
                {Object.values(items).map((i, idx) => (
                    <Box key={idx} sx={{ position: 'relative' }}>
                        <StyledEditIcon onClick={() => setUpdatedItemName(i.name)} />
                        <ShopItemComponent
                            item={i}
                            onDelete={() => {
                                setItems((prev) => {
                                    const newItems = { ...prev };
                                    delete newItems[i.name];
                                    return newItems;
                                });
                            }}
                        />
                        <EditShopItemDialog
                            item={i}
                            isOpen={updatedItemName === i.name}
                            onClose={() => setUpdatedItemName('')}
                            onUpdate={(item) => setItems((prev) => ({ ...prev, [item.name]: item }))}
                        />
                    </Box>
                ))}
                <AddElementButton
                    sx={{ width: '44px', marginBottom: '8px' }}
                    onClick={() => setAddItemDialogOpen(true)}
                    disabled={Object.keys(items).length >= 32}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    margin: '8px',
                    marginTop: '16px',
                }}
            >
                <Typography sx={{ flexGrow: 1 }} />
                <PrimaryButton
                    disabled={saveDisabled}
                    disableOnNoAuth={true}
                    loading={updateMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={onSave}
                >
                    Save
                </PrimaryButton>
            </Box>
            <AddShopItemDialog
                reservedNames={Object.values(items).map((i) => i.name)}
                isOpen={addItemDialogOpen}
                onClose={() => setAddItemDialogOpen(false)}
                onAdd={(item) => setItems((prev) => ({ ...prev, [item.name]: item }))}
            />
        </Card>
    );
};
