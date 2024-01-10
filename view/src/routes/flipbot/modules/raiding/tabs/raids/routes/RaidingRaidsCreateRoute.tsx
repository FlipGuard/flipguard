import { asMillis, capitalize, distinct } from '@flipguard/commons';
import {
    FlipBotModuleRaidingCreateRaidDto,
    RaidPayout,
    RaidPayoutType,
    TwitterRaidActionType,
} from '@flipguard/webapp-api';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import SaveIcon from '@mui/icons-material/Save';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Redirect, useLocation } from 'wouter';

import { useCreateRaidMutation } from '../../../../../../../api/mutations/flipbot-modules-raiding';
import { PrimaryButton } from '../../../../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomCheckbox } from '../../../../../../../components/atoms/inputs/checkbox/CustomCheckbox';
import { CustomSelect } from '../../../../../../../components/atoms/inputs/select/CustomSelect';
import { CustomTextField } from '../../../../../../../components/atoms/inputs/text-field/CustomTextField';
import { NumericInput } from '../../../../../../../components/atoms/inputs/text-field/NumericInput';
import { HeaderBox } from '../../../../../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../../../../../components/atoms/utils/HeaderText';
import { RoutePath } from '../../../../../../../config/constants/navigation';
import { useFlipBotContext } from '../../../../../../../contexts/flipbot-context';
import isViewMobile from '../../../../../../../hooks/utils/isViewMobile';
import {
    getDefaultPayoutForType,
    getRaidPayoutTypeDescription,
    getRaidPayoutTypeName,
    isRaidPayoutValid,
} from '../../../../../../../utils/raiding-payout';
import { displaySuccessToast } from '../../../../../../../utils/toasts';
import { RaidPayoutEditor } from '../components/payouts/RaidPayoutEditor';

const DEFAULT_PAYOUT_TYPE = RaidPayoutType.FIXED;

export const RaidingRaidsCreateRoute = () => {
    const { scopedConfig } = useFlipBotContext();
    const [, setLocation] = useLocation();
    const isMobile = isViewMobile();

    const createMutation = useCreateRaidMutation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tweetUrl, setTweetUrl] = useState('');
    const [duration, setDuration] = useState(48);
    const [requiredActions, setRequiredActions] = useState<TwitterRaidActionType[]>([]);
    const [payout, setPayout] = useState<RaidPayout>(getDefaultPayoutForType(DEFAULT_PAYOUT_TYPE));

    if (!scopedConfig) {
        return <Redirect to={RoutePath.FlipBotModuleRaiding} />;
    }

    const onCreate = () => {
        const dto: FlipBotModuleRaidingCreateRaidDto = {
            title: title.trim(),
            description: description.trim(),
            tweetUrl: tweetUrl.trim(),
            endTime: Date.now() + asMillis(duration, 'hours'),
            requiredActions: requiredActions,
            payout: payout,
        };

        createMutation.mutate(
            { configId: scopedConfig.id, dto },
            {
                onSuccess: () => {
                    displaySuccessToast('Raid has been created successfully');
                    setLocation(RoutePath.FlipBotModuleRaiding);
                },
            },
        );
    };

    const isTweetUrlValid = !!tweetUrl.match(/https:\/\/(twitter|x).com\/\w+\/status\/\d+(\?[^/]*)?$/);
    const isCreationDisabled =
        !title.trim() ||
        requiredActions.length === 0 ||
        !tweetUrl.trim() ||
        !isTweetUrlValid ||
        !isRaidPayoutValid(payout);

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px 16px 8px 16px',
                }}
            >
                <HeaderBox sx={{ marginTop: 0 }}>
                    <RepeatOutlinedIcon />
                    <HeaderText>{'Create Raid'}</HeaderText>
                </HeaderBox>
                <Box sx={{ margin: '8px', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    <CustomTextField
                        sx={{ flexGrow: 1 }}
                        name={'Title'}
                        label={'Title'}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        inputProps={{ maxLength: 64 }}
                        required
                    />
                    <NumericInput
                        sx={{ flexGrow: isMobile ? 1 : 0 }}
                        type={'integer'}
                        label={'Duration'}
                        value={duration}
                        onValueChange={setDuration}
                        onEmpty={() => setDuration(48)}
                        minValue={1}
                        maxValue={168}
                        InputProps={{ endAdornment: 'hours' }}
                    />
                </Box>
                <CustomTextField
                    sx={{ margin: '12px 8px 8px 8px' }}
                    name={'Description'}
                    label={'Description'}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    inputProps={{ maxLength: 256 }}
                    multiline
                    minRows={3}
                />
                <CustomTextField
                    sx={{ margin: '8px' }}
                    name={'Tweet URL'}
                    label={'Tweet URL'}
                    value={tweetUrl}
                    onChange={(e) => setTweetUrl(e.target.value)}
                    error={!!tweetUrl && !isTweetUrlValid}
                    helperText={!tweetUrl || isTweetUrlValid ? '' : 'Invalid Tweet URL'}
                    inputProps={{ maxLength: 256 }}
                    required
                />
                <HeaderBox>
                    <ThumbUpAltOutlinedIcon />
                    <HeaderText>Required Actions</HeaderText>
                </HeaderBox>
                <Box sx={{ margin: '8px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {Object.values(TwitterRaidActionType).map((action, idx) => (
                        <CustomCheckbox
                            key={idx}
                            label={capitalize(action.toLowerCase())}
                            checked={requiredActions.includes(action)}
                            onChange={(checked) => {
                                if (checked) {
                                    setRequiredActions((prev) => distinct([...prev, action]));
                                } else {
                                    setRequiredActions((prev) => prev.filter((v) => v !== action));
                                }
                            }}
                        />
                    ))}
                </Box>
                <HeaderBox>
                    <EmojiEventsOutlinedIcon />
                    <HeaderText>Prizes</HeaderText>
                </HeaderBox>
                <Box sx={{ margin: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <CustomSelect
                        sx={{ width: '100%' }}
                        label={'Reward Type'}
                        value={payout.type}
                        options={Object.values(RaidPayoutType).map((type) => ({
                            label: getRaidPayoutTypeName(type),
                            value: type,
                        }))}
                        onChange={(e) => setPayout(getDefaultPayoutForType(e.target.value as RaidPayoutType))}
                        helperText={getRaidPayoutTypeDescription(payout.type)}
                        select
                    />
                    <RaidPayoutEditor settings={scopedConfig.modules.raiding} payout={payout} setPayout={setPayout} />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        margin: '8px',
                        marginTop: '16px',
                    }}
                >
                    <TertiaryButton icon={WestOutlinedIcon} onClick={() => setLocation(RoutePath.FlipBotModuleRaiding)}>
                        Cancel
                    </TertiaryButton>
                    <Typography sx={{ flexGrow: 1 }} />
                    <PrimaryButton
                        disabled={isCreationDisabled}
                        disableOnNoAuth={true}
                        loading={createMutation.isLoading}
                        loadingPosition={'start'}
                        icon={SaveIcon}
                        onClick={onCreate}
                    >
                        Create
                    </PrimaryButton>
                </Box>
            </Card>
        </Grid>
    );
};
