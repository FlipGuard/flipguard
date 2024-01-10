import { formatNumberForUi } from '@flipguard/commons';
import {
    FlipBotModuleFlippingSettings,
    getDefaultFlippingGuildStats,
    SUPPORTED_FLIPBOT_TOKENS,
} from '@flipguard/webapp-api';
import { Box, BoxProps, styled, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import {
    getGuildFlippingStats,
    GuildFlippingModuleQueryKeys,
} from '../../../../../api/requests/flipbot-modules-flipping';
import { CustomSelect } from '../../../../../components/atoms/inputs/select/CustomSelect';
import { InputLikeBox } from '../../../../../components/molecules/utils/InputLikeBox';
import { TokenIcons } from '../../../../../config/constants/tokens';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});

const DataRow = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
});

type Props = BoxProps & {
    configId: string;
    config: FlipBotModuleFlippingSettings;
};

export const GuildFlippingStatsBox = ({ configId, config, ...boxProps }: Props) => {
    const [chosenToken, setChosenToken] = useState('MATIC');

    const { data: stats = getDefaultFlippingGuildStats() } = useQuery(
        GuildFlippingModuleQueryKeys.stats(configId),
        () => getGuildFlippingStats(configId),
    );

    const totalFlips = stats.totalWins + stats.totalLoses;
    const winChance = totalFlips > 0 ? (stats.totalWins / totalFlips) * 100 : 50;
    const loseChance = totalFlips > 0 ? 100 - winChance : 50;

    const supportedTokens = ['MATIC', ...Object.keys(config.flippingAmounts)];
    const tokensToShow = SUPPORTED_FLIPBOT_TOKENS.filter((tk) => supportedTokens.includes(tk));

    const tokenFlips = formatNumberForUi(stats.flipsPerToken[chosenToken] ?? 0);
    const tokenVolume = formatNumberForUi(stats.volumePerToken[chosenToken] ?? 0);
    const tokenRevenue = formatNumberForUi(stats.feesPerToken[chosenToken] ?? 0);

    return (
        <Container {...boxProps}>
            <InputLikeBox label={'Flips'} sx={{ padding: '8px 12px' }}>
                <DataRow>
                    <Typography>Total</Typography>
                    <Typography>{stats.totalWins + stats.totalLoses}</Typography>
                </DataRow>
                <DataRow>
                    <Typography>Wins</Typography>
                    <Typography>{`${stats.totalWins} (${formatNumberForUi(loseChance)}%)`}</Typography>
                </DataRow>
                <DataRow>
                    <Typography>Loses</Typography>
                    <Typography>{`${stats.totalLoses} (${formatNumberForUi(winChance)}%)`}</Typography>
                </DataRow>
            </InputLikeBox>
            <CustomSelect
                sx={{ margin: '16px 0' }}
                label={'Token'}
                options={tokensToShow.map((tk) => ({ label: tk, value: tk }))}
                value={chosenToken}
                onChange={(e) => setChosenToken(e.target.value)}
                select
            />
            <InputLikeBox sx={{ padding: '8px 12px' }}>
                <DataRow>
                    <Typography>Flips</Typography>
                    <Typography>{tokenFlips}</Typography>
                </DataRow>
                <DataRow>
                    <Typography>Volume</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>{tokenVolume}</Typography>
                        {TokenIcons[chosenToken] ? (
                            <img
                                alt={chosenToken}
                                src={TokenIcons[chosenToken]}
                                style={{ width: '20px', height: '20px', marginLeft: '6px' }}
                            />
                        ) : (
                            <Typography sx={{ marginLeft: '6px' }}>{chosenToken}</Typography>
                        )}
                    </Box>
                </DataRow>
                <DataRow>
                    <Typography>Fees</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>{tokenRevenue}</Typography>
                        {TokenIcons[chosenToken] ? (
                            <img
                                alt={chosenToken}
                                src={TokenIcons[chosenToken]}
                                style={{ width: '20px', height: '20px', marginLeft: '6px' }}
                            />
                        ) : (
                            <Typography sx={{ marginLeft: '6px' }}>{chosenToken}</Typography>
                        )}
                    </Box>
                </DataRow>
                <DataRow>
                    <Typography>ERC-20 flip fees</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>{formatNumberForUi(stats.totalErc20Fees)}</Typography>
                        <img
                            alt={'MATIC'}
                            src={TokenIcons['MATIC']}
                            style={{ width: '20px', height: '20px', marginLeft: '6px' }}
                        />
                    </Box>
                </DataRow>
            </InputLikeBox>
        </Container>
    );
};
