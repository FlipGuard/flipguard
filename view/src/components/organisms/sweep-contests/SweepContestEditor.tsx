import { distinct } from '@flipguard/commons';
import { MarketplaceName, VALID_MARKETPLACE_NAMES } from '@flipguard/domain';
import {
    MAX_SWEEP_CONTEST_COLLECTIONS,
    MAX_SWEEP_CONTEST_DESCRIPTION_LENGTH,
    MAX_SWEEP_CONTEST_DURATION,
    MAX_SWEEP_CONTEST_NAME_LENGTH,
    MAX_SWEEP_CONTEST_WINNER_GROUPS,
    MIN_SWEEP_CONTEST_START_TIME,
    SweepContestCollection,
    SweepContestSettings,
    SweepContestType,
    WinnerGroup,
} from '@flipguard/webapp-api';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined';
import { Box, Grid, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { fromUnixTime } from 'date-fns';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { CollectionAddDialog } from '../../../routes/sweep-contests-create/components/CollectionAddDialog';
import { CollectionCard } from '../../../routes/sweep-contests-create/components/CollectionCard';
import { WinnerGroupAddDialog } from '../../../routes/sweep-contests-create/components/WinnerGroupAddDialog';
import { WinnerGroupCard } from '../../../routes/sweep-contests-create/components/WinnerGroupCard';
import { DateTimePickerWrapper } from '../../atoms/dates/DateTimePickerWrapper';
import { FadingTooltip } from '../../atoms/feedback/tooltip/FadingTooltip';
import { AddElementButton } from '../../atoms/inputs/button/AddElementButton';
import { CustomCheckbox } from '../../atoms/inputs/checkbox/CustomCheckbox';
import { CustomRadioGroup } from '../../atoms/inputs/radio-group/CustomRadioGroup';
import { CustomSwitch } from '../../atoms/inputs/switch/CustomSwitch';
import { CustomTextField } from '../../atoms/inputs/text-field/CustomTextField';
import { HeaderBox } from '../../atoms/utils/HeaderBox';
import { HeaderText } from '../../atoms/utils/HeaderText';

const SWEEP_AND_HOLD_DESCRIPTION = `
    In this mode participants lose (partially) their leaderboard score if they sell NFTs 
    they bought during a sweep contest. Works only for ERC-721 collections.
`;

const WASH_TRADING_PROTECTION_DESCRIPTION = `
    Every suspicious activity will be marked and you will be able to decide whether to block certain wallets or
    specific sales from the sweep contest or not.
`;

const RUN_ON_ALL_MARKETPLACES_DESCRIPTION = `
    Disable if you want to choose specific marketplaces you want to run a sweep contest on
`;

type Props = {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    collections: SweepContestCollection[];
    setCollections: Dispatch<SetStateAction<SweepContestCollection[]>>;
    startTime: number;
    setStartTime: Dispatch<SetStateAction<number>>;
    endTime: number;
    setEndTime: Dispatch<SetStateAction<number>>;
    type: SweepContestType;
    setType: Dispatch<SetStateAction<SweepContestType>>;
    settings: SweepContestSettings;
    setSettings: Dispatch<SetStateAction<SweepContestSettings>>;
    winnerGroups: WinnerGroup[];
    setWinnerGroups: Dispatch<SetStateAction<WinnerGroup[]>>;
    entriesPerCollection: Record<string, number>;
    setEntriesPerCollection: Dispatch<SetStateAction<Record<string, number>>>;
    marketplaceRestrictions: MarketplaceName[] | undefined;
    setMarketplaceRestrictions: Dispatch<SetStateAction<MarketplaceName[] | undefined>>;
    disableTypeChange?: boolean;
};

export const SweepContestEditor = (props: Props) => {
    const [isWinnerGroupDialogOpened, setIsWinnerGroupDialogOpened] = useState(false);
    const [isCollectionDialogOpened, setIsCollectionDialogOpened] = useState(false);

    const endTimeError = (() => {
        if (props.endTime <= props.startTime) {
            return 'Invalid end time';
        } else if (props.endTime - props.startTime > MAX_SWEEP_CONTEST_DURATION) {
            return 'Sweep contest cannot run for more than 1 month';
        } else {
            return undefined;
        }
    })();

    return (
        <>
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
                    name={'Sweep Contest Name'}
                    label={'Sweep Contest Name'}
                    value={props.name}
                    onChange={(e) => props.setName(e.target.value)}
                    inputProps={{ maxLength: MAX_SWEEP_CONTEST_NAME_LENGTH }}
                    required
                />
                <CustomTextField
                    sx={{ marginTop: '12px' }}
                    name={'Sweep Contest Description'}
                    label={'Sweep Contest Description'}
                    value={props.description}
                    onChange={(e) => props.setDescription(e.target.value)}
                    inputProps={{ maxLength: MAX_SWEEP_CONTEST_DESCRIPTION_LENGTH }}
                    helperText={'Describe how winners are selected and what rewards they can get by participating'}
                    multiline
                    minRows={3}
                />
            </Box>
            <HeaderBox>
                {props.type === SweepContestType.QUANTITY ? <BarChartOutlinedIcon /> : <ShowChartOutlinedIcon />}
                <HeaderText>Sweep Contest Type</HeaderText>
            </HeaderBox>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '8px',
                    marginTop: '12px',
                }}
            >
                <CustomRadioGroup
                    sx={{ marginTop: '-4px' }}
                    radios={[
                        {
                            value: SweepContestType.QUANTITY,
                            label: 'Quantity based',
                            disabled: props.disableTypeChange && props.type !== SweepContestType.QUANTITY,
                            hideWhenDisabled: true,
                        },
                        {
                            value: SweepContestType.VOLUME,
                            label: 'Volume based',
                            disabled: props.disableTypeChange && props.type !== SweepContestType.VOLUME,
                            hideWhenDisabled: true,
                        },
                    ]}
                    onChange={(v) => props.setType(v as SweepContestType)}
                    value={props.type}
                    row
                />
            </Box>
            <HeaderBox>
                <ListAltOutlinedIcon />
                <HeaderText>Collections</HeaderText>
            </HeaderBox>
            <Box sx={{ margin: '0 8px' }}>
                <Grid container spacing={2} sx={{ marginTop: 0 }}>
                    {props.collections.map((collection, idx) => (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={6}
                            key={idx}
                            sx={{ marginTop: '-8px', marginBottom: '-8px' }}
                        >
                            <CollectionCard
                                collection={collection}
                                entries={props.entriesPerCollection[collection.address.toLowerCase()] ?? 1}
                                sweepContestType={props.type}
                                onRemove={() => props.setCollections((prev) => prev.filter((_, i) => i !== idx))}
                            />
                        </Grid>
                    ))}
                </Grid>
                {props.collections.length < MAX_SWEEP_CONTEST_COLLECTIONS && (
                    <AddElementButton
                        sx={{
                            margin: '8px 0',
                            width: '44px',
                            marginTop: props.collections.length === 0 ? '8px' : '8px',
                        }}
                        onClick={() => setIsCollectionDialogOpened(true)}
                        disabled={props.collections.length >= MAX_SWEEP_CONTEST_COLLECTIONS}
                    />
                )}
            </Box>
            <HeaderBox>
                <TimelapseOutlinedIcon />
                <HeaderText>Duration</HeaderText>
            </HeaderBox>
            <Box sx={{ margin: '8px', marginTop: '12px', display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <DateTimePickerWrapper sx={{ display: 'flex', flexGrow: 1 }}>
                            <DateTimePicker
                                sx={{ flexGrow: 1 }}
                                label={'Start Time'}
                                views={['year', 'month', 'day', 'hours', 'minutes']}
                                value={fromUnixTime(props.startTime / 1000)}
                                onChange={(date) => {
                                    if (date) {
                                        date.setSeconds(0, 0);
                                        props.setStartTime(date.getTime());
                                    }
                                }}
                                ampm={false}
                                minDateTime={fromUnixTime(MIN_SWEEP_CONTEST_START_TIME / 1000)}
                                maxDateTime={fromUnixTime((Date.now() + 90 * 24 * 3600 * 1000) / 1000)}
                                timezone={'UTC'}
                            />
                        </DateTimePickerWrapper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <DateTimePickerWrapper sx={{ display: 'flex', flexGrow: 1 }}>
                            <DateTimePicker
                                sx={{ flexGrow: 1 }}
                                slotProps={{ textField: { helperText: endTimeError } }}
                                label={'End Time'}
                                views={['year', 'month', 'day', 'hours', 'minutes']}
                                value={fromUnixTime(props.endTime / 1000)}
                                onChange={(date) => {
                                    if (date) {
                                        date.setSeconds(0, 0);
                                        props.setEndTime(date.getTime());
                                    }
                                }}
                                ampm={false}
                                minDateTime={fromUnixTime(props.startTime / 1000)}
                                maxDateTime={fromUnixTime((props.startTime + MAX_SWEEP_CONTEST_DURATION) / 1000)}
                                timezone={'UTC'}
                            />
                        </DateTimePickerWrapper>
                    </Grid>
                </Grid>
            </Box>
            <HeaderBox>
                <EmojiEventsOutlinedIcon />
                <HeaderText>Winner Groups</HeaderText>
            </HeaderBox>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {props.winnerGroups.map((winnerGroup, idx) => (
                    <WinnerGroupCard
                        key={idx}
                        winnerGroup={winnerGroup}
                        onRemove={() => props.setWinnerGroups((prev) => prev.filter((_, i) => i !== idx))}
                    />
                ))}
            </Box>
            {props.winnerGroups.length < MAX_SWEEP_CONTEST_WINNER_GROUPS && (
                <AddElementButton
                    sx={{ margin: '8px', width: '44px' }}
                    onClick={() => setIsWinnerGroupDialogOpened(true)}
                    disabled={props.winnerGroups.length >= MAX_SWEEP_CONTEST_WINNER_GROUPS}
                />
            )}
            <CollectionAddDialog
                open={isCollectionDialogOpened}
                onClose={() => setIsCollectionDialogOpened(false)}
                sweepContestType={props.type}
                addCollection={(coll, entries) => {
                    props.setCollections((prev) => [...prev, coll]);
                    props.setEntriesPerCollection((prev) => ({ ...prev, [coll.address.toLowerCase()]: entries }));
                }}
            />
            <WinnerGroupAddDialog
                open={isWinnerGroupDialogOpened}
                onClose={() => setIsWinnerGroupDialogOpened(false)}
                existingNames={props.winnerGroups.map((w) => w.name)}
                addWinnerGroup={(v) => props.setWinnerGroups((prev) => [...prev, v])}
            />
            <HeaderBox>
                <SettingsOutlinedIcon />
                <HeaderText>Settings</HeaderText>
            </HeaderBox>
            <Box sx={{ margin: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FadingTooltip title={'Public leaderboards are visible by anyone.'} placement={'top'}>
                        <HelpOutlineIcon sx={{ marginRight: '6px', color: '#aaa' }} />
                    </FadingTooltip>
                    <Typography>Public leaderboard</Typography>
                </Box>
                <CustomSwitch
                    label={''}
                    labelPlacement={'start'}
                    checked={props.settings.public}
                    onChange={(v) => props.setSettings((prev) => ({ ...prev, public: v }))}
                />
            </Box>
            <Box sx={{ margin: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FadingTooltip title={SWEEP_AND_HOLD_DESCRIPTION} placement={'top'}>
                        <HelpOutlineIcon sx={{ marginRight: '6px', color: '#aaa' }} />
                    </FadingTooltip>
                    <Typography>Sweep & Hold mode</Typography>
                </Box>
                <CustomSwitch
                    label={''}
                    labelPlacement={'start'}
                    checked={props.settings.sweepAndHold}
                    onChange={(v) => props.setSettings((prev) => ({ ...prev, sweepAndHold: v }))}
                />
            </Box>
            <Box sx={{ margin: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FadingTooltip title={WASH_TRADING_PROTECTION_DESCRIPTION} placement={'top'}>
                        <HelpOutlineIcon sx={{ marginRight: '6px', color: '#aaa' }} />
                    </FadingTooltip>
                    <Typography>Wash trading protection</Typography>
                </Box>
                <CustomSwitch disabled label={''} labelPlacement={'start'} checked={true} onChange={() => {}} />
            </Box>
            <Box sx={{ margin: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FadingTooltip title={RUN_ON_ALL_MARKETPLACES_DESCRIPTION} placement={'top'}>
                        <HelpOutlineIcon sx={{ marginRight: '6px', color: '#aaa' }} />
                    </FadingTooltip>
                    <Typography>Run on all marketplaces</Typography>
                </Box>
                <CustomSwitch
                    label={''}
                    labelPlacement={'start'}
                    checked={props.marketplaceRestrictions === undefined}
                    onChange={(checked) => {
                        if (checked) {
                            props.setMarketplaceRestrictions(undefined);
                        } else {
                            props.setMarketplaceRestrictions([]);
                        }
                    }}
                />
            </Box>
            {props.marketplaceRestrictions !== undefined && (
                <Box sx={{ margin: '8px', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '12px' }}>
                    {VALID_MARKETPLACE_NAMES.filter((n) => n !== 'Maxis')
                        .sort((a, b) => a.localeCompare(b))
                        .map((name, idx) => (
                            <CustomCheckbox
                                key={idx}
                                label={name}
                                checked={!!props.marketplaceRestrictions?.includes(name)}
                                onChange={(checked) => {
                                    if (checked) {
                                        props.setMarketplaceRestrictions((prev) =>
                                            prev ? distinct([...prev, name]) : prev,
                                        );
                                    } else {
                                        props.setMarketplaceRestrictions((prev) =>
                                            prev ? prev.filter((n) => n !== name) : prev,
                                        );
                                    }
                                }}
                            />
                        ))}
                </Box>
            )}
        </>
    );
};
