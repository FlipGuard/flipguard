import { SUPPORTED_FLIPBOT_TOKEN_SYMBOLS, TokenPoolRaidPayout } from '@flipguard/webapp-api';
import { Box } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

import { CustomSelect } from '../../../../../../../../components/atoms/inputs/select/CustomSelect';
import { NumericInput } from '../../../../../../../../components/atoms/inputs/text-field/NumericInput';

type Props = {
    payout: TokenPoolRaidPayout;
    setPayout: Dispatch<SetStateAction<TokenPoolRaidPayout>>;
};

export const RaidPayoutEditorTokenPool = ({ payout, setPayout }: Props) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <CustomSelect
                label={'Token'}
                options={SUPPORTED_FLIPBOT_TOKEN_SYMBOLS.map((symbol) => ({ label: symbol, value: symbol }))}
                value={payout.pool.symbol}
                onChange={(e) => setPayout((prev) => ({ ...prev, reward: { ...prev.pool, symbol: e.target.value } }))}
                select
            />
            <NumericInput
                type={'float'}
                label={'Amount'}
                minValue={0.000001}
                value={payout.pool.amount}
                onValueChange={(value) => setPayout((prev) => ({ ...prev, reward: { ...prev.pool, amount: value } }))}
            />
        </Box>
    );
};
