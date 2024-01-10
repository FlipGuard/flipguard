import {
    FlippingContest,
    FlippingContestWinnerPickingStrategy,
    FlippingGuildLeaderboard,
    FlippingGuildLeaderboardNames,
    FlippingGuildLeaderboardType,
} from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Box, DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useSetGlobalContestWinnersMutation } from '../../../../api/mutations/flipbot-global-config';
import { useSetCommunityContestWinnersMutation } from '../../../../api/mutations/flipbot-modules-flipping';
import { CustomDialog, CustomDialogTitle } from '../../../../components/atoms/feedback/dialog/CustomDialog';
import { TertiaryButton } from '../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomNumericTextField } from '../../../../components/atoms/inputs/text-field/CustomNumericTextField';
import { CustomTextField } from '../../../../components/atoms/inputs/text-field/CustomTextField';
import isViewMobile from '../../../../hooks/utils/isViewMobile';
import { FlipFeedUserAvatar } from './FlipFeedUserAvatar';

const STRATEGY_NAMES: Record<FlippingContestWinnerPickingStrategy, string> = {
    BEST_SCORE: 'Best Score',
    RANDOM: 'Random',
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    configId: string;
    roomId: string;
    leaderboard: FlippingGuildLeaderboard;
    contest?: FlippingContest;
    global?: boolean;
};

export const PickWinnersDialog = ({ isOpen, onClose, configId, roomId, leaderboard, contest, global }: Props) => {
    const isMobile = isViewMobile('sm');

    const globalContestMutation = useSetGlobalContestWinnersMutation();
    const guildContestMutation = useSetCommunityContestWinnersMutation();

    const [winnerCount, setWinnerCount] = useState(1);
    const [winners, setWinners] = useState<string[]>([]);

    const onPick = () => {
        if (!contest) {
            return;
        }

        const winners: string[] = [];

        const strategy = contest.leaderboards[leaderboard.type];
        if (strategy === FlippingContestWinnerPickingStrategy.BEST_SCORE) {
            Object.keys(leaderboard.scores)
                .sort(
                    leaderboard.type === FlippingGuildLeaderboardType.LOSS
                        ? (a, b) => leaderboard.scores[a] - leaderboard.scores[b]
                        : (a, b) => leaderboard.scores[b] - leaderboard.scores[a],
                )
                .slice(0, winnerCount)
                .forEach((v) => winners.push(v));
        } else if (strategy === FlippingContestWinnerPickingStrategy.RANDOM) {
            const potentialWinners = Object.keys(leaderboard.scores);
            for (let i = 0; i < winnerCount && i < potentialWinners.length; i++) {
                const rawScores = potentialWinners.map((id) => leaderboard.scores[id]);
                const winnerIdx = pickRandomIdx(rawScores);
                winners.push(potentialWinners[winnerIdx]);
                potentialWinners.splice(winnerIdx, 1);
            }
        }

        if (global) {
            globalContestMutation.mutate(
                { leaderboard: leaderboard.type, winners },
                {
                    onSuccess: () => setWinners(winners),
                },
            );
        } else {
            guildContestMutation.mutate(
                { configId, roomId, request: { leaderboard: leaderboard.type, winners } },
                {
                    onSuccess: () => setWinners(winners),
                },
            );
        }
    };

    const handleClose = () => {
        setWinners([]);
        onClose();
    };

    const isLoading = globalContestMutation.isLoading || guildContestMutation.isLoading;

    return (
        <CustomDialog
            sx={{ '& .MuiDialog-paper': { minWidth: isMobile ? 'auto' : '360px' } }}
            open={isOpen}
            onClose={handleClose}
        >
            <CustomDialogTitle>
                Pick winners
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={handleClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </CustomDialogTitle>
            <DialogContent sx={{ padding: '12px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <CustomTextField
                        sx={{ margin: '8px 0', flexGrow: 1 }}
                        label={'Leaderboard'}
                        value={FlippingGuildLeaderboardNames[leaderboard.type]}
                        disabled={true}
                    />
                    <CustomTextField
                        sx={{ margin: '8px 0', flexGrow: 1 }}
                        label={'Strategy'}
                        value={contest ? STRATEGY_NAMES[contest.leaderboards[leaderboard.type]!] : ''}
                        disabled={true}
                    />
                </Box>
                <CustomNumericTextField
                    sx={{ margin: '8px 0', width: '100%' }}
                    label={'Winner count'}
                    minValue={0}
                    maxValue={99}
                    value={winnerCount}
                    onValueChange={setWinnerCount}
                />
                {winners.length > 0 && !isLoading && (
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ marginTop: '8px' }}>Winners:</Typography>
                        {winners.map((userId, idx) => (
                            <Box key={userId} sx={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                                <Typography sx={{ width: '30px' }}>{idx + 1 + '.'}</Typography>
                                <FlipFeedUserAvatar userId={userId} withUsername={true} />
                            </Box>
                        ))}
                    </Box>
                )}
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'flex-end',
                    padding: '12px',
                }}
            >
                <TertiaryButton disabled={!contest} onClick={onPick} loading={isLoading}>
                    Pick
                </TertiaryButton>
            </DialogActions>
        </CustomDialog>
    );
};

const pickRandomIdx = (rawScores: number[]) => {
    rawScores.forEach((score, idx) => (rawScores[idx] = idx === 0 ? score : rawScores[idx - 1] + score));
    const maxChance = rawScores[rawScores.length - 1];
    const drawn = Math.floor(Math.random() * maxChance);
    return rawScores.filter((score) => drawn >= score).length;
};
