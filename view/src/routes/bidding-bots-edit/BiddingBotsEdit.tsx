import { MarketplaceNames } from '@flipguard/domain';
import {
    BiddingBotConstraints,
    BiddingBotGetDto,
    BiddingBotUpdateDto,
    OpenSeaBiddingConfig,
} from '@flipguard/webapp-api';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SaveIcon from '@mui/icons-material/Save';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Grid, InputAdornment, Typography } from '@mui/material';
import equal from 'fast-deep-equal';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useBiddingBotUpdateMutation } from '../../api/mutations/bidding-bots';
import { FadingTooltip } from '../../components/atoms/feedback/tooltip/FadingTooltip';
import { AddElementButton } from '../../components/atoms/inputs/button/AddElementButton';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { CustomRadioGroup } from '../../components/atoms/inputs/radio-group/CustomRadioGroup';
import { CustomNumericTextField } from '../../components/atoms/inputs/text-field/CustomNumericTextField';
import { CustomTextField } from '../../components/atoms/inputs/text-field/CustomTextField';
import { CustomAccordion } from '../../components/atoms/surfaces/accordion/CustomAccordion';
import { HeaderBox } from '../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../components/atoms/utils/HeaderText';
import { InputLikeBox } from '../../components/molecules/utils/InputLikeBox';
import { RoutePath } from '../../config/constants/navigation';
import isViewMobile from '../../hooks/utils/isViewMobile';
import { AddressToOutbid } from './AddressToOutbid';

const OS_SLUG_INFO = `
    Slug is the last segment in the marketplace link to your collection, i.e. https://opensea.io/collection/{slug}
`;

const DISCORD_WEBHOOK_INFO = `
    Once added, the bot will send all the important notifications to your Discord channel
`;

const OS_FALLBACK_CONFIG: OpenSeaBiddingConfig = {
    slug: '',
};

type Props = {
    bot: BiddingBotGetDto;
};

export const BiddingBotsEdit = ({ bot: originalBot }: Props) => {
    const [, setLocation] = useLocation();
    const isMobile = isViewMobile();

    const updateMutation = useBiddingBotUpdateMutation();

    const [name, setName] = useState(originalBot.name);

    const [outbidEveryone, setOutbidEveryone] = useState(originalBot.config.outbidEveryone);
    const [addressesToOutbid, setAddressesToOutbid] = useState<string[]>(originalBot.config.addressesToOutbid);
    const [bidExpirationMinutes, setBidExpirationMinutes] = useState(originalBot.config.bidExpirationMinutes);
    const [percentageLimit, setPercentageLimit] = useState(originalBot.config.floorPricePercentageLimit);
    const [webhook, setWebhook] = useState<string | undefined>(originalBot.config.discordWebhook ?? '');

    const [openSeaConfig, setOpenSeaConfig] = useState(originalBot.marketplaces?.OpenSea ?? OS_FALLBACK_CONFIG);

    const addressLimitReached = addressesToOutbid.length >= BiddingBotConstraints.addressesToOutbid.max;

    const isConfigUpdated =
        name !== originalBot.name ||
        outbidEveryone !== originalBot.config.outbidEveryone ||
        !equal(addressesToOutbid, originalBot.config.addressesToOutbid) ||
        bidExpirationMinutes !== originalBot.config.bidExpirationMinutes ||
        percentageLimit !== originalBot.config.floorPricePercentageLimit ||
        webhook !== (originalBot.config.discordWebhook ?? '') ||
        !equal(openSeaConfig, originalBot.marketplaces?.OpenSea);

    const onUpdate = () => {
        const dto: BiddingBotUpdateDto = {
            name: name,
            config: {
                outbidEveryone: outbidEveryone,
                addressesToOutbid: addressesToOutbid,
                floorPricePercentageLimit: percentageLimit,
                bidExpirationMinutes: bidExpirationMinutes,
                ...(webhook !== '' && { discordWebhook: webhook }),
            },
            marketplaces: {
                ...(!equal(openSeaConfig, originalBot.marketplaces?.OpenSea) && {
                    [MarketplaceNames.OPEN_SEA]: openSeaConfig,
                }),
            },
        };

        updateMutation.mutate(
            { botId: originalBot.id, dto },
            {
                onError: () => {
                    const originalSlug = originalBot.marketplaces?.OpenSea?.slug ?? '';
                    setOpenSeaConfig((prev) => ({ ...prev, slug: originalSlug }));
                },
                onSuccess: () => {
                    setLocation(RoutePath.BiddingBots);
                },
            },
        );
    };

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
                marginTop: isMobile ? '0px' : '16px',
            }}
        >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <HeaderBox sx={{ marginTop: 0 }}>
                        <SettingsOutlinedIcon />
                        <HeaderText>Configuration</HeaderText>
                    </HeaderBox>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <CustomTextField
                            name={'Bot Name'}
                            label={'Bot Name'}
                            sx={{ margin: '8px' }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            inputProps={{
                                maxLength: BiddingBotConstraints.name.max,
                            }}
                        />
                        <CustomTextField
                            name={'Contract address'}
                            label={'Contract address'}
                            sx={{ margin: '8px' }}
                            value={originalBot.collection}
                            disabled={true}
                        />
                        <CustomNumericTextField
                            sx={{ margin: '8px' }}
                            label={'Bid expiration time'}
                            minValue={BiddingBotConstraints.bidExpirationMinutes.min}
                            maxValue={BiddingBotConstraints.bidExpirationMinutes.max}
                            value={bidExpirationMinutes}
                            setValue={setBidExpirationMinutes}
                            adornment={'minutes'}
                        />
                        <CustomNumericTextField
                            sx={{ margin: '8px' }}
                            label={'Price limit'}
                            minValue={BiddingBotConstraints.floorPricePercentageLimit.min * 100}
                            maxValue={BiddingBotConstraints.floorPricePercentageLimit.max * 100}
                            value={Math.round(percentageLimit * 100)}
                            onValueChange={(value) => setPercentageLimit(value / 100)}
                            adornment={isMobile ? '% of FP' : '% of Floor Price'}
                        />
                        <CustomTextField
                            name={'Discord webhook'}
                            label={'Discord webhook'}
                            sx={{ margin: '8px' }}
                            placeholder={'https://discord.com/api/webhooks/xxxxx/xxxxx'}
                            value={webhook}
                            onChange={(e) => setWebhook(e.target.value)}
                            inputProps={{ maxLength: 256 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position={'end'}>
                                        <FadingTooltip title={DISCORD_WEBHOOK_INFO} placement={'top'}>
                                            <HelpOutlineOutlinedIcon
                                                sx={{ color: '#aaa', '&:hover': { cursor: 'auto' } }}
                                            />
                                        </FadingTooltip>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <CustomRadioGroup
                            sx={{ margin: '4px 12px' }}
                            value={'' + outbidEveryone}
                            onChange={(value) => setOutbidEveryone(value === 'true')}
                            radios={[
                                { value: 'true', label: 'Outbid everyone' },
                                { value: 'false', label: 'Outbid specific addresses only' },
                            ]}
                            row
                        />
                        {!outbidEveryone && (
                            <CustomAccordion
                                label={'Addresses to outbid'}
                                sx={{ margin: '8px', marginBottom: '12px !important', padding: '0 8px' }}
                            >
                                {addressesToOutbid.map((address, idx) => (
                                    <AddressToOutbid
                                        sx={{ marginTop: idx === 0 ? '12px' : '0' }}
                                        key={idx}
                                        label={`Address ${idx + 1}`}
                                        address={address}
                                        onDelete={() =>
                                            setAddressesToOutbid((prev) => prev.filter((_, i) => i !== idx))
                                        }
                                        onValueChange={(value) =>
                                            setAddressesToOutbid((prev) =>
                                                prev.map((addr, i) => (i !== idx ? addr : value)),
                                            )
                                        }
                                    />
                                ))}
                                <AddElementButton
                                    disabled={addressLimitReached}
                                    sx={{ marginTop: addressesToOutbid.length === 0 ? '4px' : '0' }}
                                    onClick={() => setAddressesToOutbid((prev) => [...prev, ''])}
                                />
                            </CustomAccordion>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <HeaderBox sx={{ marginTop: 0 }}>
                        <AssignmentOutlinedIcon />
                        <HeaderText>Marketplaces</HeaderText>
                    </HeaderBox>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            marginTop: '8px',
                        }}
                    >
                        <Box sx={{ margin: '8px' }}>
                            <InputLikeBox label={'OpenSea'}>
                                <CustomTextField
                                    name={'OpenSea slug'}
                                    label={'Slug'}
                                    sx={{ width: '100%' }}
                                    value={openSeaConfig.slug}
                                    onChange={(e) => setOpenSeaConfig((prev) => ({ ...prev, slug: e.target.value }))}
                                    inputProps={{
                                        maxLength: BiddingBotConstraints.openSeaSlug.max,
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position={'end'}>
                                                <FadingTooltip title={OS_SLUG_INFO} placement={'top'}>
                                                    <HelpOutlineOutlinedIcon
                                                        sx={{ color: '#aaa', '&:hover': { cursor: 'auto' } }}
                                                    />
                                                </FadingTooltip>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </InputLikeBox>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box
                sx={{
                    display: 'flex',
                    margin: '8px',
                }}
            >
                <TertiaryButton icon={WestOutlinedIcon} onClick={() => setLocation(RoutePath.BiddingBots)}>
                    Cancel
                </TertiaryButton>
                <Typography sx={{ flexGrow: 1 }} />
                <PrimaryButton
                    disabled={!isConfigUpdated}
                    disableOnNoAuth={true}
                    loading={updateMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={onUpdate}
                >
                    Update Bot
                </PrimaryButton>
            </Box>
        </Card>
    );
};
