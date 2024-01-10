import { formatDuration } from '@flipguard/commons';
import { FlipBotShopItem, RoleDiscordItem } from '@flipguard/webapp-api';
import { Box } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { InfoAlert } from '../../../../../../components/atoms/feedback/alert/InfoAlert';
import { CustomSelect } from '../../../../../../components/atoms/inputs/select/CustomSelect';
import { NumericInput } from '../../../../../../components/atoms/inputs/text-field/NumericInput';
import { RoleDiscordItemBuilder } from '../../../../../../components/molecules/discord-items/builders/RoleDiscordItemBuilder';

const DURATION_DESCRIPTION = `
    Leave duration input blank if you don't want the role to expire
`;

const UNIT_MULTIPLIERS: Record<string, number> = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 24 * 60 * 60,
};

const UNIT_NAMES: Record<string, string> = {
    s: 'Seconds',
    m: 'Minutes',
    h: 'Hours',
    d: 'Days',
};

type TimeUnit = keyof typeof UNIT_MULTIPLIERS;

type Props = {
    item: FlipBotShopItem;
    setItem: Dispatch<SetStateAction<FlipBotShopItem>>;
};

export const RoleShopItemBuilder = ({ item, setItem }: Props) => {
    const formattedDuration = item.duration ? formatDuration(item.duration) : '';

    const [unit, setUnit] = useState<string>(formattedDuration ? formattedDuration.split(' ')[1][0] : 'd');
    const [duration, setDuration] = useState(item.duration ? Number(formattedDuration.split(' ')[0]) : undefined);

    const durationMultiplier = UNIT_MULTIPLIERS[unit];

    useEffect(() => {
        setItem((prev) => ({ ...prev, duration: duration ? duration * durationMultiplier : undefined }));
    }, [unit]);

    return (
        <>
            <RoleDiscordItemBuilder item={item} setItem={setItem as Dispatch<SetStateAction<RoleDiscordItem>>} />
            <Box sx={{ margin: '8px', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <NumericInput
                    sx={{ flexGrow: 1 }}
                    type={'integer'}
                    label={'Duration'}
                    value={duration}
                    onValueChange={(value) => {
                        setDuration(value);
                        setItem((prev) => ({ ...prev, duration: value * durationMultiplier }));
                    }}
                    onEmpty={() => {
                        setDuration(undefined);
                        setItem((prev) => ({ ...prev, duration: undefined }));
                    }}
                />
                <CustomSelect
                    sx={{ width: '128px' }}
                    name={'Unit'}
                    label={'Unit'}
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as TimeUnit)}
                    options={Object.keys(UNIT_MULTIPLIERS).map((unit) => ({ label: UNIT_NAMES[unit], value: unit }))}
                    select
                />
            </Box>
            <InfoAlert sx={{ margin: '8px' }}>{DURATION_DESCRIPTION}</InfoAlert>
        </>
    );
};
