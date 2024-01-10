import { FlipBotModuleRaidingSettings, FlipBotModuleRaidingSettingsUpdateDto } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Card, Divider, styled, Typography } from '@mui/material';
import equal from 'fast-deep-equal';
import React, { useEffect, useState } from 'react';

import { useRaidingModuleSettingsUpdateMutation } from '../../../../../../api/mutations/flipbot-guild-configs';
import { InfoAlert } from '../../../../../../components/atoms/feedback/alert/InfoAlert';
import { WarningAlert } from '../../../../../../components/atoms/feedback/alert/WarningAlert';
import { AddElementButton } from '../../../../../../components/atoms/inputs/button/AddElementButton';
import { PrimaryButton } from '../../../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomSelect } from '../../../../../../components/atoms/inputs/select/CustomSelect';
import { HeaderBox } from '../../../../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../../../../components/atoms/utils/HeaderText';
import { DiscordPoolItemComponent } from '../../../../../../components/molecules/discord-items/DiscordPoolItemComponent';
import { displaySuccessToast } from '../../../../../../utils/toasts';
import { AddRaidingRewardDialog } from './components/AddRaidingRewardDialog';
import { AddRaidingRewardPoolDialog } from './components/AddRaidingRewardPoolDialog';
import { EditRaidingRewardDialog } from './components/EditRaidingRewardDialog';

const DESCRIPTION = `
    Randomized reward pools can be used with the "Random Reward Pool" raid reward type.
`;

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
    config: FlipBotModuleRaidingSettings;
};

export const RaidingRewardsTab = ({ configId, config }: Props) => {
    const updateMutation = useRaidingModuleSettingsUpdateMutation();

    const [chosenRewardPool, setChosenRewardPool] = useState(Object.keys(config.randomRewardPools)[0] ?? '');
    const [addRewardPoolDialogOpen, setAddRewardPoolDialogOpen] = useState(false);
    const [addRewardDialogOpen, setAddRewardDialogOpen] = useState(false);
    const [rewardPools, setRewardPools] = useState(config.randomRewardPools);
    const [updatedRewardIdx, setUpdatedRewardIdx] = useState(-1);

    useEffect(() => {
        setRewardPools(config.randomRewardPools);
    }, [JSON.stringify(config.randomRewardPools)]);

    const onUpdate = () => {
        const dto: FlipBotModuleRaidingSettingsUpdateDto = {
            randomRewardPools: rewardPools,
        };

        updateMutation.mutate(
            { configId, dto },
            {
                onSuccess: () => {
                    displaySuccessToast('Reward pools have been updated');
                },
            },
        );
    };

    const rewards = rewardPools[chosenRewardPool]?.items ?? [];
    const cumulatedChance = rewards.map((r) => r.chance).reduce((a, b) => a + b, 0);

    const errorMessage = cumulatedChance > 100 ? 'Total win chance of all rewards in the pool cannot exceed 100%' : '';
    const saveDisabled = equal(config.randomRewardPools, rewardPools) || !!errorMessage;

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
                    onClick={() => setAddRewardPoolDialogOpen(true)}
                    disabled={Object.keys(rewardPools).length >= 16}
                >
                    Add reward pool
                </TertiaryButton>
                <CustomSelect
                    sx={{ flexGrow: 1 }}
                    label={'Reward pool'}
                    options={Object.values(rewardPools).map((r) => ({ label: r.name, value: r.name }))}
                    value={chosenRewardPool}
                    onChange={(e) => setChosenRewardPool(e.target.value)}
                    disabled={Object.keys(rewardPools).length === 0}
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
                        setRewardPools((prev) => {
                            const next = { ...prev };
                            delete next[chosenRewardPool];
                            return next;
                        });
                        setChosenRewardPool(Object.keys(rewardPools).filter((v) => v !== chosenRewardPool)[0] ?? '');
                    }}
                    disabled={!chosenRewardPool}
                    tooltipMessage={'Remove reward pool'}
                >
                    <DeleteOutlineOutlinedIcon sx={{ marginTop: '6px' }} />
                </TertiaryButton>
            </Box>
            <InfoAlert sx={{ margin: '8px' }}>{DESCRIPTION}</InfoAlert>
            <Divider sx={{ margin: '12px 8px 4px 8px', borderStyle: 'dashed' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', margin: '8px' }}>
                <Typography sx={{ fontSize: '18px', fontWeight: 400 }}>Rewards in the pool</Typography>
                <Box sx={{ marginTop: '8px', display: 'flex', flexDirection: 'column' }}>
                    {rewards.map((r, idx) => (
                        <Box key={idx} sx={{ position: 'relative' }}>
                            <StyledEditIcon onClick={() => setUpdatedRewardIdx(idx)} />
                            <DiscordPoolItemComponent
                                item={r}
                                onDelete={() =>
                                    setRewardPools((prev) => ({
                                        ...prev,
                                        [chosenRewardPool]: {
                                            ...prev[chosenRewardPool],
                                            items: prev[chosenRewardPool].items.filter((_, i) => i !== idx),
                                        },
                                    }))
                                }
                            />
                        </Box>
                    ))}
                    <AddElementButton
                        sx={{ width: '44px', marginBottom: '8px' }}
                        onClick={() => setAddRewardDialogOpen(true)}
                        disabled={!chosenRewardPool || rewards.length >= 32}
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
            <AddRaidingRewardPoolDialog
                reservedNames={Object.keys(rewardPools)}
                isOpen={addRewardPoolDialogOpen}
                onClose={() => setAddRewardPoolDialogOpen(false)}
                onAdd={(name) => {
                    setRewardPools((prev) => ({ ...prev, [name]: { name, items: [] } }));
                    setChosenRewardPool(name);
                }}
            />
            <AddRaidingRewardDialog
                isOpen={addRewardDialogOpen}
                onClose={() => setAddRewardDialogOpen(false)}
                onAdd={(reward) => {
                    setRewardPools((prev) => ({
                        ...prev,
                        [chosenRewardPool]: {
                            ...prev[chosenRewardPool],
                            items: [...prev[chosenRewardPool].items, reward],
                        },
                    }));
                }}
            />
            <EditRaidingRewardDialog
                rewards={rewards}
                idx={updatedRewardIdx}
                isOpen={updatedRewardIdx > -1}
                onClose={() => setUpdatedRewardIdx(-1)}
                onUpdate={(value, idx) =>
                    setRewardPools((prev) => ({
                        ...prev,
                        [chosenRewardPool]: {
                            ...prev[chosenRewardPool],
                            items: prev[chosenRewardPool].items.map((v, i) => (i === idx ? value : v)),
                        },
                    }))
                }
            />
        </Card>
    );
};
