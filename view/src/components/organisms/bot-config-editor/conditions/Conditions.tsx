import { BotWizardCondition, VariableFluffName } from '@flipguard/webapp-api';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { ComponentType, Dispatch, SetStateAction } from 'react';

import { PriceConditionBuilder } from './builders/PriceConditionBuilder';
import { RankConditionBuilder } from './builders/RankConditionBuilder';
import { StringConditionBuilder } from './builders/StringConditionBuilder';
import { TraitConditionBuilder } from './builders/TraitConditionBuilder';

export type ConditionBuilderProps = {
    condition: BotWizardCondition;
    onChange: Dispatch<SetStateAction<BotWizardCondition>>;
};

type BotWizardConditionMeta = {
    conditionName: (condition: BotWizardCondition) => string;
    conditionSummaryName: (condition: BotWizardCondition) => string;
    variableName: string;
    builder: ComponentType<ConditionBuilderProps>;
    icon: ComponentType;
};

export const BOT_WIZARD_CONDITIONS_META: Record<VariableFluffName | string, BotWizardConditionMeta> = {
    'listing.price': {
        conditionName: () => 'Price',
        conditionSummaryName: () => 'price',
        variableName: 'Price',
        builder: PriceConditionBuilder,
        icon: MonetizationOnOutlinedIcon,
    },
    'sale.price': {
        conditionName: () => 'Price',
        conditionSummaryName: () => 'price',
        variableName: 'Price',
        builder: PriceConditionBuilder,
        icon: MonetizationOnOutlinedIcon,
    },
    'buyer.address': {
        conditionName: () => 'Buyer',
        conditionSummaryName: () => 'buyer address',
        variableName: 'Buyer',
        builder: StringConditionBuilder,
        icon: BadgeOutlinedIcon,
    },
    'seller.address': {
        conditionName: () => 'Seller',
        conditionSummaryName: () => 'seller address',
        variableName: 'Seller',
        builder: StringConditionBuilder,
        icon: BadgeOutlinedIcon,
    },
    'nft.traits': {
        conditionName: (condition) => condition.key ?? '?',
        conditionSummaryName: (condition) => 'value of the ' + (condition.key ?? '?') + ' trait',
        variableName: 'Trait',
        builder: TraitConditionBuilder,
        icon: FormatListBulletedOutlinedIcon,
    },
    'nft.rank': {
        conditionName: () => 'Rank',
        conditionSummaryName: () => 'token rarity is available and rarity rank',
        variableName: 'Rank',
        builder: RankConditionBuilder,
        icon: AutoAwesomeOutlinedIcon,
    },
    'nft.name': {
        conditionName: () => 'Name',
        conditionSummaryName: () => 'token name',
        variableName: 'Name',
        builder: StringConditionBuilder,
        icon: BadgeOutlinedIcon,
    },
};
