import {
    FixedRaidPayout,
    FlipBotModuleRaidingSettings,
    RaidPayout,
    RaidPayoutType,
    RandomPoolRaidPayout,
    TokenPoolRaidPayout,
} from '@flipguard/webapp-api';
import React, { Dispatch, SetStateAction } from 'react';

import { RaidPayoutEditorFixed } from './RaidPayoutEditorFixed';
import { RaidPayoutEditorRandomPool } from './RaidPayoutEditorRandomPool';
import { RaidPayoutEditorTokenPool } from './RaidPayoutEditorTokenPool';

type Props = {
    settings: FlipBotModuleRaidingSettings;
    payout: RaidPayout;
    setPayout: Dispatch<SetStateAction<RaidPayout>>;
};

export const RaidPayoutEditor = ({ settings, payout, setPayout }: Props) => {
    if (payout.type === RaidPayoutType.FIXED) {
        return (
            <RaidPayoutEditorFixed payout={payout} setPayout={setPayout as Dispatch<SetStateAction<FixedRaidPayout>>} />
        );
    } else if (payout.type === RaidPayoutType.TOKEN_POOL) {
        return (
            <RaidPayoutEditorTokenPool
                payout={payout}
                setPayout={setPayout as Dispatch<SetStateAction<TokenPoolRaidPayout>>}
            />
        );
    } else if (payout.type === RaidPayoutType.RANDOM_POOL) {
        return (
            <RaidPayoutEditorRandomPool
                settings={settings}
                payout={payout}
                setPayout={setPayout as Dispatch<SetStateAction<RandomPoolRaidPayout>>}
            />
        );
    }

    return null;
};
