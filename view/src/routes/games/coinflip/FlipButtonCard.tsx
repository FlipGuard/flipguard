import { FlippingRoomDto, getFlipLevelForExp, SUPPORTED_FLIPBOT_TOKENS } from '@flipguard/webapp-api';
import { Box, styled, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useExecuteFlipMutation } from '../../../api/mutations/coinflip';
import { NumericInputArrowButton } from '../../../components/atoms/inputs/button/NumericInputArrowButton';
import { PrimaryButton } from '../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../components/atoms/inputs/button/TertiaryButton';
import { CustomSelect } from '../../../components/atoms/inputs/select/CustomSelect';
import { CustomTextField } from '../../../components/atoms/inputs/text-field/CustomTextField';
import { useAuth } from '../../../hooks/use-auth';

const FLIPPING_INTERVAL_BASE = 10000;

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});

type Props = {
    flippingRoom?: FlippingRoomDto;
    flippingAmounts: Record<string, number[]>;
    balances: Record<string, number>;
    chosenToken: string;
    setChosenToken: Dispatch<SetStateAction<string>>;
};

export const FlipButtonCard = ({ flippingRoom, flippingAmounts, balances, chosenToken, setChosenToken }: Props) => {
    const { flipProfile } = useAuth();

    const guildId = flippingRoom?.roomId ?? '';
    const supportedTokens = Object.keys(flippingAmounts).filter((tk) => flippingAmounts[tk].length > 0);
    const tokensToShow = SUPPORTED_FLIPBOT_TOKENS.filter((tk) => supportedTokens.includes(tk));

    const executeFlipMutation = useExecuteFlipMutation();

    const [chosenAmount, setChosenAmount] = useState(flippingAmounts[chosenToken][0]);
    const [flippingActive, setFlippingActive] = useState(false);
    const [flippingCanceled, setFlippingCanceled] = useState(false);
    const [flipsInQueue, setFlipsInQueue] = useState<number>(1);

    useEffect(() => {
        if (flippingActive) {
            if (flipsInQueue <= 0) {
                setFlipsInQueue(1);
                setFlippingActive(false);
                setFlippingCanceled(false);
            } else if (!flippingCanceled) {
                executeFlipMutation.mutate({ guildId: guildId, token: chosenToken, amount: chosenAmount });
                const timer = setTimeout(() => setFlipsInQueue((prev) => prev - 1), FLIPPING_INTERVAL_BASE);
                return () => clearTimeout(timer);
            }
        }
    }, [flippingActive, flipsInQueue, flippingCanceled]);

    const maxFlipsToQueue = Math.min(
        getFlipLevelForExp(flipProfile.experience)[0],
        Math.floor(balances[chosenToken] / chosenAmount),
    );

    const availableBets = [...flippingAmounts[chosenToken]].sort((a, b) => a - b);

    const onFlipsInQueueChange = (v: string) => {
        const value = Math.floor(parseInt(v));
        if (value < 0 || value > 999) {
            return;
        }

        setFlipsInQueue(value);
    };

    const flippingLoading = executeFlipMutation.isLoading || flippingActive;

    const [flipsToQueueInputError, flipsToQueueInputErrorReason] = (() => {
        if (maxFlipsToQueue > 0 && flipsInQueue > maxFlipsToQueue) {
            return [true, `You cannot queue more than ${maxFlipsToQueue} flips for this token`];
        } else if (isNaN(flipsInQueue)) {
            return [true, 'Please specify a number of flips to queue'];
        } else {
            return [false, ''];
        }
    })();

    const [flippingDisabled, flippingDisabledReason] = (() => {
        if (balances[chosenToken] < chosenAmount) {
            return [true, 'Insufficient funds'];
        } else if (!flippingRoom) {
            return [true, 'Invalid room'];
        } else if (flipsToQueueInputError) {
            return [true, flipsToQueueInputErrorReason];
        } else {
            return [flipsInQueue <= 0, ''];
        }
    })();

    return (
        <Container>
            <CustomSelect
                sx={{ margin: '8px' }}
                label={'Token'}
                options={tokensToShow.map((tk) => ({ label: tk, value: tk }))}
                value={chosenToken}
                onChange={(e) => {
                    const tk = e.target.value;
                    setChosenToken(tk);
                    setChosenAmount(flippingAmounts[tk][0]);
                    setFlipsInQueue(1);
                }}
                disabled={flippingLoading}
                select
            />
            <Box sx={{ display: 'flex' }}>
                <CustomSelect
                    sx={{ margin: '8px', width: '50%' }}
                    label={'Bet amount'}
                    options={availableBets.map((v) => ({ label: '' + v, value: '' + v }))}
                    value={'' + chosenAmount}
                    onChange={(e) => {
                        setChosenAmount(Number(e.target.value));
                        setFlipsInQueue(1);
                    }}
                    disabled={flippingLoading}
                    select
                />
                <Box
                    sx={{
                        position: 'relative',
                        margin: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        width: '50%',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                        <CustomTextField
                            sx={{ flexGrow: 1 }}
                            label={flippingActive ? 'Flips in queue' : 'Flips to queue'}
                            value={isNaN(flipsInQueue) ? '' : flipsInQueue}
                            onChange={(e) => onFlipsInQueueChange(e.target.value)}
                            disabled={flippingLoading}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginLeft: '4px',
                            }}
                        >
                            <NumericInputArrowButton
                                onPress={() =>
                                    setFlipsInQueue((prev) => (isNaN(prev) ? 1 : Math.min(maxFlipsToQueue, prev + 1)))
                                }
                                disabled={flippingLoading}
                                direction={'up'}
                            />
                            <NumericInputArrowButton
                                sx={{ marginTop: '2px' }}
                                onPress={() => setFlipsInQueue((prev) => (isNaN(prev) ? 1 : Math.max(0, prev - 1)))}
                                disabled={flippingLoading}
                                direction={'down'}
                            />
                        </Box>
                    </Box>
                    <TertiaryButton
                        sx={{
                            marginTop: '4px',
                            height: '24px',
                            width: '40px',
                            fontSize: '12px',
                            fontWeight: 300,
                            textTransform: 'none',
                        }}
                        onClick={() => setFlipsInQueue(maxFlipsToQueue)}
                        disabled={flippingLoading}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            Max:
                            <Typography
                                sx={(theme) => ({
                                    fontSize: 'inherit',
                                    fontWeight: 'inherit',
                                    color: flippingLoading
                                        ? `${theme.palette.secondary.main}66`
                                        : theme.palette.secondary.main,
                                    marginLeft: '4px',
                                })}
                            >
                                {maxFlipsToQueue}
                            </Typography>
                        </Box>
                    </TertiaryButton>
                </Box>
            </Box>
            <Box sx={{ margin: '8px' }}>
                {flippingActive && !flippingCanceled && flipsInQueue > 1 ? (
                    <TertiaryButton
                        sx={{ width: '100%' }}
                        onClick={() => {
                            setFlippingCanceled(true);
                            setFlipsInQueue(0);
                        }}
                    >
                        Cancel
                    </TertiaryButton>
                ) : (
                    <PrimaryButton
                        sx={{ width: '100%' }}
                        onClick={() => setFlippingActive(true)}
                        disabled={flippingDisabled}
                        loading={flippingLoading}
                        tooltipMessage={flippingDisabledReason}
                        tooltipPlacement={'top'}
                    >
                        Flip
                    </PrimaryButton>
                )}
            </Box>
        </Container>
    );
};
