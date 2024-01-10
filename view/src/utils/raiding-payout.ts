import { DiscordItemType, RaidPayout, RaidPayoutTimeType, RaidPayoutType } from '@flipguard/webapp-api';

export const getDefaultPayoutForType = (type: RaidPayoutType): RaidPayout => {
    switch (type) {
        case 'FIXED':
            return {
                type: type,
                time: RaidPayoutTimeType.INSTANT,
                reward: {
                    type: DiscordItemType.TOKEN,
                    symbol: 'MATIC',
                    amount: 0.1,
                },
            };
        case 'TOKEN_POOL':
            return {
                type: type,
                time: RaidPayoutTimeType.DELAYED,
                pool: {
                    type: DiscordItemType.TOKEN,
                    symbol: 'MATIC',
                    amount: 5,
                },
            };
        case 'RANDOM_POOL':
            return {
                type: type,
                time: RaidPayoutTimeType.INSTANT,
                baseReward: {
                    type: DiscordItemType.TOKEN,
                    symbol: 'MATIC',
                    amount: 0.1,
                },
                randomPool: '',
            };
    }
};

export const isRaidPayoutValid = (payout: RaidPayout) => {
    if (payout.type === 'RANDOM_POOL') {
        return !!payout.randomPool;
    } else {
        return true;
    }
};

export const getRaidPayoutTypeName = (type: RaidPayoutType) => {
    switch (type) {
        case 'FIXED':
            return 'Fixed Reward';
        case 'TOKEN_POOL':
            return 'Shared Token Pool';
        case 'RANDOM_POOL':
            return 'Random Reward Pool';
    }
};

export const getRaidPayoutTypeDescription = (type: RaidPayoutType) => {
    switch (type) {
        case 'FIXED':
            return 'All raiders will get the same reward as soon as their raids are verified';
        case 'TOKEN_POOL':
            return 'All raiders will share the same prize pool which is distributed among them once the raid ends';
        case 'RANDOM_POOL':
            return 'All raiders will have a chance to get a random reward from the pool';
    }
};
