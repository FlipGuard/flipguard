import {
    FlipBotModuleFlippingSettings,
    FlipBotModuleFlippingSettingsUpdateDto,
    FlipBotTokens,
    SUPPORTED_FLIPBOT_TOKENS,
} from '@flipguard/webapp-api';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Card, Chip, styled, SvgIconProps, Typography } from '@mui/material';
import equal from 'fast-deep-equal';
import React, { useState } from 'react';

import { useFlippingModuleSettingsUpdateMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { InfoAlert } from '../../../../../components/atoms/feedback/alert/InfoAlert';
import { WarningAlert } from '../../../../../components/atoms/feedback/alert/WarningAlert';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { CustomSelect } from '../../../../../components/atoms/inputs/select/CustomSelect';
import { RemovableElement } from '../../../../../components/atoms/inputs/utils/RemovableElement';
import { HeaderBox } from '../../../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../../../components/atoms/utils/HeaderText';
import { displaySuccessToast } from '../../../../../utils/toasts';
import { FlippingAmountDialog } from '../components/FlippingAmountDialog';

const INFO_TEXT = `
    Choose one of the supported tokens from the selector below and enter bet amounts you want your bot to support.
`;

const WARNING_TEXT = `
    Amounts exceeding 5% of the desired house balance are not recommended as someone lucky can drain your house wallet quickly.
`;

const AddAmountButton = styled(AddCircleOutlineOutlinedIcon, {
    shouldForwardProp: (prop) => prop !== 'disabled',
})<SvgIconProps & { disabled: boolean }>(({ disabled }) => ({
    color: '#555',
    '&:hover': {
        color: disabled ? 'auto' : '#aaa',
        cursor: disabled ? 'not-allowed' : 'pointer',
    },
}));

type Props = {
    configId: string;
    config: FlipBotModuleFlippingSettings;
};

export const FlipBotFlippingModuleBetsCard = ({ configId, config }: Props) => {
    const updateMutation = useFlippingModuleSettingsUpdateMutation();

    const [flippingAmounts, setFlippingAmounts] = useState(config.flippingAmounts);
    const [chosenToken, setChosenToken] = useState(SUPPORTED_FLIPBOT_TOKENS[0]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const onSave = () => {
        const dto: FlipBotModuleFlippingSettingsUpdateDto = {
            flippingAmounts: flippingAmounts,
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

    const amountsForToken = [...(flippingAmounts[chosenToken] ?? [])].sort((a, b) => a - b);
    const saveDisabled = equal(flippingAmounts, config.flippingAmounts);
    const amountAddingDisabled = amountsForToken.length >= 10;

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
            }}
        >
            <HeaderBox sx={{ marginTop: 0 }}>
                <MonetizationOnOutlinedIcon />
                <HeaderText>Bets</HeaderText>
            </HeaderBox>
            <InfoAlert sx={{ margin: '8px' }}>{INFO_TEXT}</InfoAlert>
            <CustomSelect
                sx={{ margin: '8px' }}
                options={SUPPORTED_FLIPBOT_TOKENS.map((token) => ({
                    label: FlipBotTokens[token].symbol,
                    value: token,
                }))}
                value={chosenToken}
                onChange={(e) => setChosenToken(e.target.value)}
                select
            />
            <Box sx={{ margin: '8px 8px 0 8px', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                {amountsForToken.map((amount, idx) => (
                    <RemovableElement
                        sx={{ marginBottom: '8px', marginRight: '12px' }}
                        key={idx}
                        onDelete={() =>
                            setFlippingAmounts((prev) => {
                                const prevAmounts = prev[chosenToken] ?? [];
                                const newAmounts = prevAmounts.filter((v) => v !== amount);
                                const next = { ...prev };
                                if (newAmounts.length === 0) {
                                    delete next[chosenToken];
                                } else {
                                    next[chosenToken] = newAmounts;
                                }
                                return next;
                            })
                        }
                    >
                        <Chip label={amount + ' ' + chosenToken} sx={{ height: '28px' }} />
                    </RemovableElement>
                ))}
                <AddAmountButton
                    sx={{ marginBottom: '8px', height: '28px' }}
                    onClick={() => {
                        if (!amountAddingDisabled) {
                            setDialogOpen(true);
                        }
                    }}
                    disabled={amountAddingDisabled}
                />
            </Box>
            <WarningAlert sx={{ margin: '8px' }}>{WARNING_TEXT}</WarningAlert>
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
            <FlippingAmountDialog
                token={chosenToken}
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onCreate={(amount) =>
                    setFlippingAmounts((prev) => {
                        const prevAmounts = prev[chosenToken] ?? [];
                        const newAmounts = prevAmounts.includes(amount) ? prevAmounts : [...prevAmounts, amount];
                        return {
                            ...prev,
                            [chosenToken]: newAmounts,
                        };
                    })
                }
            />
        </Card>
    );
};
