import { FlipBotModuleRumbleSettings, FlipBotModuleRumbleSettingsUpdateDto } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Card, Divider, styled, Typography } from '@mui/material';
import equal from 'fast-deep-equal';
import React, { useEffect, useState } from 'react';

import { useRumbleModuleSettingsUpdateMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { WarningAlert } from '../../../../../components/atoms/feedback/alert/WarningAlert';
import { AddElementButton } from '../../../../../components/atoms/inputs/button/AddElementButton';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomSelect } from '../../../../../components/atoms/inputs/select/CustomSelect';
import { HeaderBox } from '../../../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../../../components/atoms/utils/HeaderText';
import { DiscordPoolItemComponent } from '../../../../../components/molecules/discord-items/DiscordPoolItemComponent';
import { displaySuccessToast } from '../../../../../utils/toasts';
import { AddRumbleRewardDialog } from '../components/AddRumbleRewardDialog';
import { AddRumbleRewardSetDialog } from '../components/AddRumbleRewardSetDialog';
import { EditRumbleRewardDialog } from '../components/EditRumbleRewardDialog';

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
    config: FlipBotModuleRumbleSettings;
};

export const RumbleRewardsTab = ({ configId, config }: Props) => {
    const updateMutation = useRumbleModuleSettingsUpdateMutation();

    const [chosenRewardSet, setChosenRewardSet] = useState(Object.keys(config.rewards)[0] ?? '');
    const [addRewardSetDialogOpen, setAddRewardSetDialogOpen] = useState(false);
    const [addRewardDialogOpen, setAddRewardDialogOpen] = useState(false);
    const [rewardSets, setRewardSets] = useState(config.rewards);
    const [updatedRewardIdx, setUpdatedRewardIdx] = useState(-1);

    useEffect(() => {
        setRewardSets(config.rewards);
    }, [JSON.stringify(config.rewards)]);

    const onUpdate = () => {
        const dto: FlipBotModuleRumbleSettingsUpdateDto = {
            rewards: rewardSets,
        };

        updateMutation.mutate(
            { configId, dto },
            {
                onSuccess: () => {
                    displaySuccessToast('Rewards have been updated');
                },
            },
        );
    };

    const rewards = rewardSets[chosenRewardSet]?.rewards ?? [];
    const cumulatedChance = rewards.map((r) => r.chance).reduce((a, b) => a + b, 0);

    const errorMessage = cumulatedChance > 100 ? 'Total win chance of all rewards cannot exceed 100%' : '';
    const saveDisabled = equal(config.rewards, rewardSets) || !!errorMessage;

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
                <HeaderText>{'Rewards'}</HeaderText>
            </HeaderBox>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    margin: '8px',
                    gap: '16px',
                }}
            >
                <TertiaryButton
                    sx={{ height: '40px' }}
                    onClick={() => setAddRewardSetDialogOpen(true)}
                    disabled={Object.keys(rewardSets).length >= 16}
                >
                    Add reward set
                </TertiaryButton>
                <CustomSelect
                    sx={{ flexGrow: 1 }}
                    label={'Reward set'}
                    options={Object.values(rewardSets).map((r) => ({ label: r.name, value: r.name }))}
                    value={chosenRewardSet}
                    onChange={(e) => setChosenRewardSet(e.target.value)}
                    select
                />
                <TertiaryButton
                    sx={(theme) => ({
                        background: theme.palette.error.main,
                        '&:hover': {
                            background: theme.palette.error.light,
                        },
                        height: '40px',
                        width: '40px',
                        minWidth: '40px',
                    })}
                    onClick={() => {
                        setRewardSets((prev) => {
                            const next = { ...prev };
                            delete next[chosenRewardSet];
                            return next;
                        });
                        setChosenRewardSet(Object.keys(rewardSets).filter((v) => v !== chosenRewardSet)[0] ?? '');
                    }}
                    disabled={!chosenRewardSet}
                    tooltipMessage={'Remove reward set'}
                >
                    <DeleteOutlineOutlinedIcon sx={{ marginTop: '6px' }} />
                </TertiaryButton>
            </Box>
            <Divider sx={{ margin: '12px 8px 4px 8px', borderStyle: 'dashed' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', margin: '8px' }}>
                <Typography sx={{ fontSize: '18px', fontWeight: 400 }}>Reward Pool</Typography>
                <Box sx={{ marginTop: '8px', display: 'flex', flexDirection: 'column' }}>
                    {rewards.map((r, idx) => (
                        <Box key={idx} sx={{ position: 'relative' }}>
                            <StyledEditIcon onClick={() => setUpdatedRewardIdx(idx)} />
                            <DiscordPoolItemComponent
                                item={r}
                                onDelete={() =>
                                    setRewardSets((prev) => ({
                                        ...prev,
                                        [chosenRewardSet]: {
                                            ...prev[chosenRewardSet],
                                            rewards: prev[chosenRewardSet].rewards.filter((_, i) => i !== idx),
                                        },
                                    }))
                                }
                            />
                        </Box>
                    ))}
                    <AddElementButton
                        sx={{ width: '44px', marginBottom: '8px' }}
                        onClick={() => setAddRewardDialogOpen(true)}
                        disabled={!chosenRewardSet || rewards.length >= 32}
                    />
                </Box>
            </Box>
            {errorMessage && <WarningAlert sx={{ margin: '0 8px' }}>{errorMessage}</WarningAlert>}
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
                    onClick={onUpdate}
                >
                    Save
                </PrimaryButton>
            </Box>
            <AddRumbleRewardSetDialog
                reservedNames={Object.keys(rewardSets)}
                isOpen={addRewardSetDialogOpen}
                onClose={() => setAddRewardSetDialogOpen(false)}
                onAdd={({ name }) => {
                    setRewardSets((prev) => ({ ...prev, [name]: { name, rewards: [] } }));
                    setChosenRewardSet(name);
                }}
            />
            <AddRumbleRewardDialog
                isOpen={addRewardDialogOpen}
                onClose={() => setAddRewardDialogOpen(false)}
                onAdd={(reward) => {
                    setRewardSets((prev) => ({
                        ...prev,
                        [chosenRewardSet]: {
                            ...prev[chosenRewardSet],
                            rewards: [...prev[chosenRewardSet].rewards, reward],
                        },
                    }));
                }}
            />
            <EditRumbleRewardDialog
                rewards={rewards}
                idx={updatedRewardIdx}
                isOpen={updatedRewardIdx > -1}
                onClose={() => setUpdatedRewardIdx(-1)}
                onUpdate={(value, idx) =>
                    setRewardSets((prev) => ({
                        ...prev,
                        [chosenRewardSet]: {
                            ...prev[chosenRewardSet],
                            rewards: prev[chosenRewardSet].rewards.map((v, i) => (i === idx ? value : v)),
                        },
                    }))
                }
            />
        </Card>
    );
};
