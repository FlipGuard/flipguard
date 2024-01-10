import {
    ALL_ORDER_ITEM_TYPES,
    GenerateGiftCodeDto,
    GiftCodeItem,
    OrderItem,
    OrderItemType,
} from '@flipguard/webapp-api';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import { Box, Card, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useGenerateGiftCodeMutation } from '../../../api/mutations/gift-codes';
import { PrimaryButton } from '../../../components/atoms/inputs/button/PrimaryButton';
import { CustomCheckbox } from '../../../components/atoms/inputs/checkbox/CustomCheckbox';
import { CustomNumericTextField } from '../../../components/atoms/inputs/text-field/CustomNumericTextField';
import isViewMobile from '../../../hooks/utils/isViewMobile';

export const GenerateGiftCodeCard = () => {
    const isMobile = isViewMobile();

    const [items, setItems] = useState<Record<OrderItemType | string, GiftCodeItem>>({});

    const generateGiftCodeMutation = useGenerateGiftCodeMutation();

    const onGenerate = () => {
        const dto: GenerateGiftCodeDto = {
            items: Object.values(items),
        };

        generateGiftCodeMutation.mutate(dto);

        setItems({});
    };

    const onCheckboxChange = (item: OrderItemType, checked: boolean) => {
        if (checked) {
            setItems((prev) => ({ ...prev, [item]: { type: item, days: 0 } }));
        } else {
            setItems((prev) => {
                const newItems = { ...prev };
                delete newItems[item];
                return newItems;
            });
        }
    };

    const onDaysChange = (item: OrderItemType, days: number) => {
        setItems((prev) => ({ ...prev, [item]: { type: item, days: days } }));
    };

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '8px 16px 8px 16px',
                marginTop: isMobile ? '0px' : '16px',
            }}
        >
            <Typography sx={{ margin: '8px' }} variant={'h6'}>
                Generate gift code
            </Typography>
            <Box sx={{ margin: '0 8px 8px 8px' }}>
                {ALL_ORDER_ITEM_TYPES.map((item, idx) => (
                    <GiftCodeItemCheckbox
                        key={idx}
                        type={item}
                        days={items[item]?.days}
                        checked={items[item] !== undefined}
                        onChange={(checked) => onCheckboxChange(item, checked)}
                        onDaysChange={(days) => onDaysChange(item, days)}
                    />
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <PrimaryButton
                    sx={{ margin: '16px 8px 8px 8px' }}
                    disabled={Object.keys(items).length === 0}
                    disableOnNoAuth={true}
                    loading={generateGiftCodeMutation.isLoading}
                    loadingPosition={'start'}
                    icon={CardGiftcardOutlinedIcon}
                    onClick={onGenerate}
                >
                    Generate
                </PrimaryButton>
            </Box>
        </Card>
    );
};

type GiftCodeItemCheckboxProps = {
    type: OrderItemType;
    days?: number;
    checked: boolean;
    onChange: (checked: boolean) => void;
    onDaysChange: (days: number) => void;
};

const GiftCodeItemCheckbox = ({ type, days, checked, onChange, onDaysChange }: GiftCodeItemCheckboxProps) => {
    const isMobile = isViewMobile('sm');

    const item = OrderItem.forType(type);

    return (
        <Box sx={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
            <CustomCheckbox
                boxProps={{ sx: { flexGrow: 1, height: '40px', marginRight: '8px' } }}
                label={item.name}
                checked={checked}
                onChange={onChange}
            />
            <CustomNumericTextField
                sx={{ flexGrow: 1, width: isMobile ? '64px' : 'auto', maxWidth: '150px', height: '100%' }}
                value={days ?? 0}
                onValueChange={onDaysChange}
                minValue={1}
                maxValue={Number.MAX_SAFE_INTEGER}
                adornment={'Days'}
                disabled={!checked || item.quantity !== undefined}
            />
        </Box>
    );
};
