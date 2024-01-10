import {
    FlipBotTokens,
    FlippingContest,
    FlippingContestWinnerPickingStrategy,
    FlippingGuildLeaderboardNames,
    FlippingGuildLeaderboardType,
    MAX_FLIPPING_CONTEST_DESCRIPTION_LENGTH,
    MAX_FLIPPING_CONTEST_DURATION,
    MAX_FLIPPING_CONTEST_NAME_LENGTH,
    MIN_FLIPPING_CONTEST_START_TIME,
    SUPPORTED_FLIPBOT_TOKENS,
} from '@flipguard/webapp-api';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { fromUnixTime } from 'date-fns';
import equal from 'fast-deep-equal';
import React, { useState } from 'react';

import { DateTimePickerWrapper } from '../../../../../components/atoms/dates/DateTimePickerWrapper';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { CustomCheckbox } from '../../../../../components/atoms/inputs/checkbox/CustomCheckbox';
import { CustomSelect } from '../../../../../components/atoms/inputs/select/CustomSelect';
import { CustomSwitch } from '../../../../../components/atoms/inputs/switch/CustomSwitch';
import { CustomTextField } from '../../../../../components/atoms/inputs/text-field/CustomTextField';
import { HeaderBox } from '../../../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../../../components/atoms/utils/HeaderText';

const STRATEGY_NAMES: Record<FlippingContestWinnerPickingStrategy, string> = {
    BEST_SCORE: 'Best Score',
    RANDOM: 'Random (based on score)',
};

type Props = {
    contest?: FlippingContest | null;
    onSave: (contest: FlippingContest) => void;
    isSaveLoading: boolean;
};

export const FlippingContestEditor = ({ contest: originalContest, onSave, isSaveLoading }: Props) => {
    const [active, setActive] = useState(!!originalContest?.active);
    const [name, setName] = useState(originalContest?.name ?? '');
    const [description, setDescription] = useState(originalContest?.description ?? '');
    const [startTime, setStartTime] = useState(originalContest?.startTime ?? Date.now());
    const [endTime, setEndTime] = useState(originalContest?.endTime ?? Date.now() + 7 * 24 * 3600 * 1000);
    const [token, setToken] = useState(originalContest?.token ?? 'MATIC');
    const [leaderboards, setLeaderboards] = useState(originalContest?.leaderboards ?? {});

    const contest = {
        active,
        name,
        description,
        startTime,
        endTime,
        token,
        leaderboards,
        winners: originalContest?.winners ?? {},
    };

    const endTimeError = (() => {
        if (endTime <= startTime) {
            return 'Invalid end time';
        } else if (endTime - startTime > MAX_FLIPPING_CONTEST_DURATION) {
            return 'Flipping event cannot run for more than 3 months';
        } else {
            return undefined;
        }
    })();

    const saveDisabled = equal(contest, originalContest);

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
            }}
        >
            <HeaderBox sx={{ marginTop: 0 }}>
                <EmojiEventsOutlinedIcon />
                <HeaderText>Flipping Event</HeaderText>
            </HeaderBox>
            <CustomSwitch
                sx={{ margin: '8px -4px 8px 8px', justifyContent: 'space-between' }}
                label={'Active'}
                labelPlacement={'start'}
                checked={active}
                onChange={setActive}
            />
            <Divider sx={{ margin: '8px 8px 16px 8px', borderStyle: 'dashed' }} />
            <CustomTextField
                sx={{ margin: '8px' }}
                name={'Event Name'}
                label={'Event Name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                inputProps={{ maxLength: MAX_FLIPPING_CONTEST_NAME_LENGTH }}
                required
            />
            <CustomTextField
                sx={{ margin: '8px' }}
                name={'Event Description'}
                label={'Event Description'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                inputProps={{ maxLength: MAX_FLIPPING_CONTEST_DESCRIPTION_LENGTH }}
                helperText={'Describe how winners are selected and what rewards they can get by participating'}
                multiline
                minRows={3}
            />
            <Box sx={{ margin: '8px', marginTop: '12px', display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <DateTimePickerWrapper sx={{ display: 'flex', flexGrow: 1 }}>
                            <DateTimePicker
                                sx={{ flexGrow: 1 }}
                                label={'Start Time'}
                                views={['year', 'month', 'day', 'hours', 'minutes']}
                                value={fromUnixTime(startTime / 1000)}
                                onChange={(v) => v && setStartTime(v.getTime())}
                                ampm={false}
                                minDateTime={fromUnixTime(MIN_FLIPPING_CONTEST_START_TIME / 1000)}
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
                                value={fromUnixTime(Math.floor(endTime / 1000))}
                                onChange={(v) => v && setEndTime(v.getTime())}
                                ampm={false}
                                minDateTime={fromUnixTime(startTime / 1000)}
                                maxDateTime={fromUnixTime((startTime + MAX_FLIPPING_CONTEST_DURATION) / 1000)}
                                timezone={'UTC'}
                            />
                        </DateTimePickerWrapper>
                    </Grid>
                </Grid>
            </Box>
            <CustomSelect
                sx={{ margin: '8px' }}
                label={'Token'}
                options={SUPPORTED_FLIPBOT_TOKENS.map((token) => ({
                    label: FlipBotTokens[token].symbol,
                    value: token,
                }))}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                helperText={'Flips with this token will be counted towards user score'}
                select
            />
            <Typography sx={{ margin: '8px', fontSize: '17px' }}>Leaderboards to include:</Typography>
            {Object.values(FlippingGuildLeaderboardType).map((type) => (
                <Box
                    key={type}
                    sx={{ margin: '6px 8px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}
                >
                    <CustomCheckbox
                        boxProps={{ sx: { height: '40px', minWidth: '200px' } }}
                        label={FlippingGuildLeaderboardNames[type]}
                        checked={!!leaderboards[type]}
                        onChange={(checked) => {
                            if (checked) {
                                setLeaderboards((prev) => ({
                                    ...prev,
                                    [type]: FlippingContestWinnerPickingStrategy.BEST_SCORE,
                                }));
                            } else {
                                setLeaderboards((prev) => {
                                    const next = { ...prev };
                                    delete next[type];
                                    return next;
                                });
                            }
                        }}
                    />
                    <CustomSelect
                        label={'Winner picking strategy'}
                        sx={{ flexGrow: 1 }}
                        options={Object.values(FlippingContestWinnerPickingStrategy).map((v) => ({
                            label: STRATEGY_NAMES[v],
                            value: v,
                        }))}
                        value={leaderboards[type] ?? ''}
                        onChange={(e) => setLeaderboards((prev) => ({ ...prev, [type]: e.target.value }))}
                        disabled={!leaderboards[type]}
                        select
                    />
                </Box>
            ))}
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
                    loading={isSaveLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={() => onSave(contest)}
                >
                    Save
                </PrimaryButton>
            </Box>
        </Card>
    );
};
