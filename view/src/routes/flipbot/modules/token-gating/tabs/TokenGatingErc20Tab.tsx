import { FlipBotModuleTokenGatingSettings, FlipBotModuleTokenGatingSettingsUpdateDto } from '@flipguard/webapp-api';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import SaveIcon from '@mui/icons-material/Save';
import TheaterComedyOutlinedIcon from '@mui/icons-material/TheaterComedyOutlined';
import { Box, Card, Typography } from '@mui/material';
import { ethers } from 'ethers';
import equal from 'fast-deep-equal';
import React, { useEffect, useState } from 'react';

import { useTokenGatingModuleSettingsUpdateMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { AddElementButton } from '../../../../../components/atoms/inputs/button/AddElementButton';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { Erc20TokenAddressTextField } from '../../../../../components/atoms/inputs/text-field/Erc20TokenAddressTextField';
import { HeaderBox } from '../../../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../../../components/atoms/utils/HeaderText';
import isViewMobile from '../../../../../hooks/utils/isViewMobile';
import { displaySuccessToast } from '../../../../../utils/toasts';
import { AddTokenGatedRoleDialog } from '../components/AddTokenGatedRoleDialog';
import { TokenGatedRole } from '../components/TokenGatedRole';

type Props = {
    configId: string;
    config: FlipBotModuleTokenGatingSettings;
};

export const TokenGatingErc20Tab = ({ config, configId }: Props) => {
    const isMobile = isViewMobile();

    const updateMutation = useTokenGatingModuleSettingsUpdateMutation();

    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [tokenAddress, setTokenAddress] = useState(config.tokenAddress);
    const [roles, setRoles] = useState(config.roles);

    useEffect(() => {
        setRoles(config.roles);
    }, [JSON.stringify(config.roles)]);

    const onSave = () => {
        const dto: FlipBotModuleTokenGatingSettingsUpdateDto = {
            tokenAddress: tokenAddress,
            roles: roles,
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

    const isAddressValid = !tokenAddress || ethers.utils.isAddress(tokenAddress);
    const saveDisabled = !isAddressValid || (tokenAddress === config.tokenAddress && equal(roles, config.roles));

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
                marginTop: isMobile ? '0px' : '16px',
            }}
        >
            <HeaderBox sx={{ marginTop: 0 }}>
                <AssignmentOutlinedIcon />
                <HeaderText>{'Token'}</HeaderText>
            </HeaderBox>
            <Erc20TokenAddressTextField
                sx={{ margin: '8px', marginTop: '16px', flexGrow: 1 }}
                name={'Token address'}
                label={'Token address'}
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                required
            />
            <HeaderBox>
                <TheaterComedyOutlinedIcon />
                <HeaderText>{'Roles'}</HeaderText>
            </HeaderBox>
            <Box sx={{ margin: '8px', display: 'flex', flexDirection: 'column' }}>
                {[...roles]
                    .sort((a, b) => b.requiredBalance - a.requiredBalance)
                    .map((role, idx) => (
                        <Box key={idx} sx={{ position: 'relative' }}>
                            <TokenGatedRole
                                role={role}
                                onDelete={() => {
                                    setRoles((prev) => prev.filter((r) => r.roleId !== role.roleId));
                                }}
                            />
                        </Box>
                    ))}
                <AddElementButton
                    sx={{ width: '44px', marginBottom: '8px' }}
                    onClick={() => setAddDialogOpen(true)}
                    disabled={roles.length >= 32}
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
            <AddTokenGatedRoleDialog
                isOpen={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
                onAdd={(role) => setRoles((prev) => [...prev, role])}
            />
        </Card>
    );
};
