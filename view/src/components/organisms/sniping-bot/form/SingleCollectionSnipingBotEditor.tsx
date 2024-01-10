import {
    AutobuyWizardAction,
    BotModelContraints,
    SnipingSingleCollectionBotWizardConfigModel,
} from '@flipguard/webapp-api';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, Grid } from '@mui/material';
import { ethers } from 'ethers';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useAccount } from 'wagmi';

import { InfoAlert } from '../../../atoms/feedback/alert/InfoAlert';
import { WarningAlert } from '../../../atoms/feedback/alert/WarningAlert';
import { TertiaryButton } from '../../../atoms/inputs/button/TertiaryButton';
import { CustomCheckbox } from '../../../atoms/inputs/checkbox/CustomCheckbox';
import { CustomRadioGroup } from '../../../atoms/inputs/radio-group/CustomRadioGroup';
import { CustomNumericTextField } from '../../../atoms/inputs/text-field/CustomNumericTextField';
import { CustomTextField } from '../../../atoms/inputs/text-field/CustomTextField';
import { HeaderBox } from '../../../atoms/utils/HeaderBox';
import { HeaderText } from '../../../atoms/utils/HeaderText';
import { BurnerSelect } from './BurnerSelect';
import { ConditionGroup } from './ConditionGroup';
import { ContractAddressTextField } from './ContractAddressTextField';

const DEFAULT_GAS_MULTIPLIER = 2;
const DEFAULT_TX_FEE = 0.5;

type Props = {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    wizardBotConfig: SnipingSingleCollectionBotWizardConfigModel;
    setWizardBotConfig: Dispatch<SetStateAction<SnipingSingleCollectionBotWizardConfigModel>>;
};

export const SingleCollectionSnipingBotEditor = ({ name, setName, wizardBotConfig, setWizardBotConfig }: Props) => {
    const { address, isConnected } = useAccount();

    const action = wizardBotConfig.action;

    const [useGasMultiplier, setUseGasMultiplier] = useState(action.gasMultiplier !== undefined);
    const [transferOnSnipe, setTransferOnSnipe] = useState(!!action.transferTo);

    const updateAction = (fn: (prev: AutobuyWizardAction) => AutobuyWizardAction) => {
        setWizardBotConfig((prev) => {
            return { ...prev, action: fn(prev.action) };
        });
    };

    const onTransferOnSnipeChange = (transfer: boolean) => {
        setTransferOnSnipe(transfer);
        const recipient = transfer && isConnected ? address : '';
        updateAction((prev) => ({ ...prev, transferTo: recipient }));
    };

    const onUseGasMultiplierChange = (useMultiplier: boolean) => {
        setUseGasMultiplier(useMultiplier);
        updateAction((prev) => {
            if (useMultiplier) {
                delete action['txFee'];
                return { ...prev, gasMultiplier: DEFAULT_GAS_MULTIPLIER };
            } else {
                delete action['gasMultiplier'];
                return { ...prev, txFee: DEFAULT_TX_FEE };
            }
        });
    };

    const chosenIntegrationId = action.burner;
    const isRecipientAddressValid = !action.transferTo || ethers.utils.isAddress(action.transferTo ?? '');
    const priceConditionAdded = wizardBotConfig.conditions.every(
        (group) => group.find((c) => c.variable === 'listing.price') !== undefined,
    );

    return (
        <>
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        margin: '8px',
                        marginTop: '12px',
                    }}
                >
                    <CustomTextField
                        name={'Bot Name'}
                        label={'Bot Name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        inputProps={{ maxLength: BotModelContraints.name.max }}
                        required
                    />
                    <ContractAddressTextField
                        sx={{ marginTop: '12px' }}
                        address={wizardBotConfig.collection}
                        onAddressChange={(address) => setWizardBotConfig((prev) => ({ ...prev, collection: address }))}
                    />
                </Box>
                <HeaderBox>
                    <FilterAltOutlinedIcon />
                    <HeaderText>Filters</HeaderText>
                </HeaderBox>
                {wizardBotConfig.conditions.map((group, groupIdx) => (
                    <ConditionGroup
                        key={groupIdx}
                        groupIdx={groupIdx}
                        wizardBotConfig={wizardBotConfig}
                        setWizardBotConfig={setWizardBotConfig}
                    />
                ))}
                <TertiaryButton
                    size={'small'}
                    sx={{ margin: '0 8px', marginTop: wizardBotConfig.conditions.length === 0 ? '4px' : '8px' }}
                    onClick={() => setWizardBotConfig((prev) => ({ ...prev, conditions: [...prev.conditions, []] }))}
                >
                    Add filter
                </TertiaryButton>
                <InfoAlert sx={{ margin: '16px 8px 0 8px' }}>
                    Your bot will be triggered only if all conditions from at least one filter are met
                </InfoAlert>
            </Box>
            <HeaderBox>
                <LocalFireDepartmentOutlinedIcon />
                <HeaderText>Burner to snipe from</HeaderText>
            </HeaderBox>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <BurnerSelect
                    burnerId={chosenIntegrationId}
                    onBurnerIdChange={(burnerId) => updateAction((prev) => ({ ...prev, burner: burnerId }))}
                />
            </Box>
            <Grid container spacing={5} sx={{ marginTop: 0 }}>
                <Grid item xs={12} sm={12} md={12} lg={6} sx={{ paddingTop: '0 !important' }}>
                    <HeaderBox>
                        <SettingsOutlinedIcon />
                        <HeaderText>Bot settings</HeaderText>
                    </HeaderBox>
                    <CustomCheckbox
                        label={'Transfer NFT to another wallet on snipe'}
                        withNoBorder={true}
                        checked={transferOnSnipe}
                        onChange={onTransferOnSnipeChange}
                    />
                    <Box sx={{ display: 'flex' }}>
                        <CustomTextField
                            sx={{ margin: '8px', flexGrow: 1 }}
                            name={'Recipient'}
                            label={'Recipient Address'}
                            disabled={!transferOnSnipe}
                            placeholder={'0x...'}
                            value={action.transferTo ?? ''}
                            onChange={(e) => updateAction((prev) => ({ ...prev, transferTo: e.target.value }))}
                            inputProps={{ maxLength: 42 }}
                            helperText={!isRecipientAddressValid ? 'Address is invalid' : undefined}
                            error={!isRecipientAddressValid}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} sx={{ paddingTop: '0 !important' }}>
                    <HeaderBox>
                        <LocalGasStationOutlinedIcon />
                        <HeaderText>Gas settings</HeaderText>
                    </HeaderBox>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            margin: '8px',
                        }}
                    >
                        <CustomRadioGroup
                            radios={[
                                { value: 'true', label: 'Use gas multiplier' },
                                { value: 'false', label: 'Use fixed gas' },
                            ]}
                            onChange={(v) => onUseGasMultiplierChange(v === 'true')}
                            value={'' + useGasMultiplier}
                            row
                        />
                    </Box>
                    <Box sx={{ margin: '8px', display: 'flex' }}>
                        {useGasMultiplier ? (
                            <CustomNumericTextField
                                sx={{ flexGrow: 1 }}
                                name={'Gas Multiplier'}
                                label={'Gas Multiplier'}
                                minValue={1}
                                maxValue={999}
                                value={action.gasMultiplier ?? DEFAULT_GAS_MULTIPLIER}
                                onValueChange={(value) => updateAction((prev) => ({ ...prev, gasMultiplier: value }))}
                            />
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexGrow: 1,
                                }}
                            >
                                <CustomNumericTextField
                                    sx={{ flexGrow: 1 }}
                                    name={'Fixed Gas'}
                                    label={'Fixed Gas'}
                                    minValue={0.1}
                                    maxValue={999}
                                    value={action.txFee ?? DEFAULT_TX_FEE}
                                    onValueChange={(value) => updateAction((prev) => ({ ...prev, txFee: value }))}
                                    adornment={'MATIC'}
                                    inputProps={{
                                        step: 0.1,
                                    }}
                                />
                                <InfoAlert sx={{ marginTop: '8px' }}>
                                    Final transaction fee may be a bit lower as the bot heavily relies on estimations to
                                    speed up sniping
                                </InfoAlert>
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Grid>
            {!priceConditionAdded && (
                <WarningAlert sx={{ margin: '8px', marginTop: '16px' }}>
                    {"You didn't set a price condition in one or more filters"}
                </WarningAlert>
            )}
        </>
    );
};
