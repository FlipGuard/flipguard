import { BotWizardCondition } from '@flipguard/webapp-api';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

import { BOT_WIZARD_CONDITIONS_META } from './Conditions';

type Props = {
    condition: BotWizardCondition;
    remove: () => void;
};

export const WizardBotCondition = ({ condition, remove }: Props) => {
    const conditionMeta = BOT_WIZARD_CONDITIONS_META[condition.variable];
    const conditionName = conditionMeta ? conditionMeta.conditionName(condition) : '';

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #444',
                borderRadius: '8px',
                padding: '8px 10px',
                minHeight: '42px',
                paddingRight: '16px',
                marginTop: '12px',
                marginRight: '12px',
                position: 'relative',
            }}
        >
            <HighlightOffOutlinedIcon
                sx={(theme) => ({
                    color: '#aaa',
                    backgroundColor: theme.palette.primary.main,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    zIndex: 2,
                    position: 'absolute',
                    right: -8,
                    top: -8,
                    '&:hover': {
                        cursor: 'pointer',
                        color: '#ddd',
                    },
                })}
                onClick={remove}
            />
            <ConditionIcon condition={condition} />
            <Divider orientation={'vertical'} sx={{ marginLeft: '8px' }} />
            <Typography sx={{ marginLeft: '10px', wordBreak: 'none' }}>{conditionName}</Typography>
            <Typography sx={{ fontFamily: "'JetBrains Mono', sans-serif", marginLeft: '8px', color: '#aaa' }}>
                {condition.operator}
            </Typography>
            <Typography sx={{ marginLeft: '8px', wordBreak: 'break-word' }}>
                {condition.values.join(',\u200B ')}
            </Typography>
        </Box>
    );
};

const ConditionIcon = ({ condition }: { condition: BotWizardCondition }) => {
    const conditionMeta = BOT_WIZARD_CONDITIONS_META[condition.variable];
    const Icon = conditionMeta?.icon;
    return Icon ? <Icon /> : null;
};
