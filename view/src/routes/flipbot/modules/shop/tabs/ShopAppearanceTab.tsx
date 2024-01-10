import { FlipBotModuleShopSettings, FlipBotModuleShopSettingsUpdateDto } from '@flipguard/webapp-api';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Card, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useShopModuleSettingsUpdateMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { CustomTextField } from '../../../../../components/atoms/inputs/text-field/CustomTextField';
import { HeaderBox } from '../../../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../../../components/atoms/utils/HeaderText';
import { displaySuccessToast } from '../../../../../utils/toasts';

type Props = {
    configId: string;
    config: FlipBotModuleShopSettings;
};

export const ShopAppearanceTab = ({ configId, config }: Props) => {
    const updateMutation = useShopModuleSettingsUpdateMutation();

    const [name, setName] = useState(config.shopName);
    const [description, setDescription] = useState(config.shopDescription);

    const onSave = () => {
        const dto: FlipBotModuleShopSettingsUpdateDto = {
            shopName: name,
            shopDescription: description,
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

    const isConfigEqual = name === config.shopName && description === config.shopDescription;

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
            }}
        >
            <HeaderBox sx={{ marginTop: 0 }}>
                <DesignServicesOutlinedIcon />
                <HeaderText>Appearance</HeaderText>
            </HeaderBox>
            <CustomTextField
                sx={{ margin: '8px' }}
                name={'Shop Name'}
                label={'Shop Name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                inputProps={{ maxLength: 64 }}
            />
            <CustomTextField
                sx={{ margin: '8px' }}
                name={'Shop Description'}
                label={'Shop Description'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                inputProps={{ maxLength: 1024 }}
                multiline
                minRows={3}
            />
            <Box
                sx={{
                    display: 'flex',
                    margin: '8px',
                    marginTop: '16px',
                }}
            >
                <Typography sx={{ flexGrow: 1 }} />
                <PrimaryButton
                    disabled={isConfigEqual}
                    disableOnNoAuth={true}
                    loading={updateMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={onSave}
                >
                    Save
                </PrimaryButton>
            </Box>
        </Card>
    );
};
