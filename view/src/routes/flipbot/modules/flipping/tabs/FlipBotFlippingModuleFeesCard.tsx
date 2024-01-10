import {
    FlipBotModuleFlippingSettings,
    FlipBotModuleFlippingSettingsUpdateDto,
    FLIPPING_ERC_20_MAX_FEE,
    FLIPPING_MAX_ROLE_FEES,
    FLIPPING_MODULE_MAX_FEE,
    FLIPPING_MODULE_MIN_FEE,
} from '@flipguard/webapp-api';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SaveIcon from '@mui/icons-material/Save';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import { Box, Card, Typography } from '@mui/material';
import equal from 'fast-deep-equal';
import React, { useState } from 'react';

import { useFlippingModuleSettingsUpdateMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { InfoAlert } from '../../../../../components/atoms/feedback/alert/InfoAlert';
import { AddElementButton } from '../../../../../components/atoms/inputs/button/AddElementButton';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { CustomNumericTextField } from '../../../../../components/atoms/inputs/text-field/CustomNumericTextField';
import { HeaderBox } from '../../../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../../../components/atoms/utils/HeaderText';
import { displaySuccessToast } from '../../../../../utils/toasts';
import { RoleFeeAddDialog } from '../components/RoleFeeAddDialog';
import { RoleFeeCard } from '../components/RoleFeeCard';

const DEFAULT_FEE_HELPER_TEXT = `
    Portion of every flip amount that will be sent to your fee wallet as soon as it's done.
`;

const DEFAULT_ERC20_FEE_HELPER_TEXT = `
    Flat fee being charged on ERC-20 token flips, in addition to the default house fee.
`;

const DEFAULT_FEE_INFO = `
    FlipGuard takes half of the house fee, up to a maximum of 4%, which is deducted from the house wallet every time a flip is executed. 
`;

const ROLE_FEES_DESCRIPTION = `
    You can customize flipping fees per Discord server roles. If a flipper has multiple custom fee roles, the lowest fee will always be applied.
`;

const FEE_BATCHING_INFO = `
    All fees are being batched, and are distributed only after a threshold of 1 $MATIC has been reached or the time 
    since the last flip exceeds 1 minute. Thanks to this you don't have to pay for gas on every charged fee when flips volume is high. 
`;

type Props = {
    configId: string;
    config: FlipBotModuleFlippingSettings;
};

export const FlipBotFlippingModuleFeesCard = ({ configId, config }: Props) => {
    const updateMutation = useFlippingModuleSettingsUpdateMutation();

    const [defaultFee, setDefaultFee] = useState(config.defaultFee);
    const [extraFee, setExtraFee] = useState(config.defaultErc20FlatFee);
    const [feeDialogOpen, setFeeDialogOpen] = useState(false);
    const [roleFees, setRoleFees] = useState(config.roleFees);

    const onSave = () => {
        const dto: FlipBotModuleFlippingSettingsUpdateDto = {
            defaultFee: defaultFee,
            defaultErc20FlatFee: extraFee,
            roleFees: roleFees,
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

    const areConfigsEqual = () => {
        return (
            defaultFee === config.defaultFee &&
            extraFee === config.defaultErc20FlatFee &&
            equal(roleFees, config.roleFees)
        );
    };

    const saveDisabled = areConfigsEqual();

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
            }}
        >
            <HeaderBox sx={{ marginTop: 0 }}>
                <SavingsOutlinedIcon />
                <HeaderText>Fees</HeaderText>
            </HeaderBox>
            <CustomNumericTextField
                sx={{ margin: '8px', flexGrow: 1 }}
                name={'Default house fee'}
                label={'Default house fee'}
                minValue={FLIPPING_MODULE_MIN_FEE}
                maxValue={FLIPPING_MODULE_MAX_FEE}
                value={defaultFee}
                onValueChange={setDefaultFee}
                adornment={'% of the flip amount'}
                helperText={DEFAULT_FEE_HELPER_TEXT}
            />
            <CustomNumericTextField
                sx={{ margin: '8px', flexGrow: 1 }}
                name={'ERC-20 flips house fee'}
                label={'ERC-20 flips house fee'}
                minValue={0}
                maxValue={FLIPPING_ERC_20_MAX_FEE}
                value={extraFee}
                onValueChange={setExtraFee}
                adornment={'MATIC'}
                helperText={DEFAULT_ERC20_FEE_HELPER_TEXT}
                inputProps={{
                    step: 0.001,
                }}
            />
            <InfoAlert sx={{ margin: '8px' }}>{DEFAULT_FEE_INFO}</InfoAlert>
            <InfoAlert sx={{ margin: '8px' }}>{FEE_BATCHING_INFO}</InfoAlert>
            <HeaderBox>
                <PeopleAltOutlinedIcon />
                <HeaderText>Role fees</HeaderText>
            </HeaderBox>
            <InfoAlert sx={{ margin: '8px' }}>{ROLE_FEES_DESCRIPTION}</InfoAlert>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {Object.entries(roleFees).map(([roleId, roleFee]) => (
                    <RoleFeeCard
                        key={roleId}
                        roleFee={roleFee}
                        onDelete={() =>
                            setRoleFees((prev) => {
                                const newRoleFees = { ...prev };
                                delete newRoleFees[roleId];
                                return newRoleFees;
                            })
                        }
                    />
                ))}
            </Box>
            <AddElementButton
                sx={{
                    margin: '8px',
                    width: '44px',
                    marginTop: Object.keys(roleFees).length === 0 ? '8px' : 0,
                }}
                onClick={() => setFeeDialogOpen(true)}
                disabled={Object.keys(roleFees).length >= FLIPPING_MAX_ROLE_FEES}
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
            <RoleFeeAddDialog
                isOpen={feeDialogOpen}
                onClose={() => setFeeDialogOpen(false)}
                onCreate={(roleFee) => setRoleFees((prev) => ({ ...prev, [roleFee.roleId]: roleFee }))}
            />
        </Card>
    );
};
