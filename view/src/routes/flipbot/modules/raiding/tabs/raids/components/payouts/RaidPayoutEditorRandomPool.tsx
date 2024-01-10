import {
    DiscordItemType,
    FlipBotModuleRaidingSettings,
    RandomPoolRaidPayout,
    SUPPORTED_FLIPBOT_TOKEN_SYMBOLS,
    TokenDiscordItem,
} from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

import { CustomSelect } from '../../../../../../../../components/atoms/inputs/select/CustomSelect';
import { CustomSwitch } from '../../../../../../../../components/atoms/inputs/switch/CustomSwitch';
import { NumericInput } from '../../../../../../../../components/atoms/inputs/text-field/NumericInput';

type Props = {
    settings: FlipBotModuleRaidingSettings;
    payout: RandomPoolRaidPayout;
    setPayout: Dispatch<SetStateAction<RandomPoolRaidPayout>>;
};

export const RaidPayoutEditorRandomPool = ({ settings, payout, setPayout }: Props) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <CustomSelect
                label={'Reward Pool'}
                value={payout.randomPool}
                options={Object.keys(settings.randomRewardPools).map((pool) => ({ label: pool, value: pool }))}
                onChange={(e) => setPayout((prev) => ({ ...prev, randomPool: e.target.value }))}
                select
            />
            <CustomSwitch
                sx={{ justifyContent: 'space-between', marginLeft: 0 }}
                label={'Include default reward'}
                labelPlacement={'start'}
                checked={!!payout.baseReward}
                onChange={(checked) => {
                    if (!checked) {
                        setPayout((prev) => ({ ...prev, baseReward: undefined }));
                    } else {
                        setPayout((prev) => ({
                            ...prev,
                            baseReward: { type: DiscordItemType.TOKEN, symbol: 'MATIC', amount: 0.1 },
                        }));
                    }
                }}
            />
            <Typography sx={{ fontSize: '13px', color: '#aaa', marginTop: '-16px' }}>
                {`Raiders will get a default reward for raiding if the reward pool is empty or they didn't get any reward from the pool`}
            </Typography>
            <CustomSelect
                label={'Token'}
                options={SUPPORTED_FLIPBOT_TOKEN_SYMBOLS.map((symbol) => ({ label: symbol, value: symbol }))}
                value={payout.baseReward?.symbol ?? 'MATIC'}
                disabled={!payout.baseReward}
                onChange={(e) =>
                    setPayout((prev) => ({
                        ...prev,
                        baseReward: { ...(prev.baseReward as TokenDiscordItem), symbol: e.target.value },
                    }))
                }
                select
            />
            <NumericInput
                type={'float'}
                label={'Amount'}
                minValue={0.000001}
                value={payout.baseReward?.amount ?? 0.1}
                disabled={!payout.baseReward}
                onValueChange={(value) =>
                    setPayout((prev) => ({
                        ...prev,
                        baseReward: { ...(prev.baseReward as TokenDiscordItem), amount: value },
                    }))
                }
            />
        </Box>
    );
};
