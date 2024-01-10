import { NftEventType } from '@flipguard/domain';
import { BotWizardCondition } from '@flipguard/webapp-api';
import { Box } from '@mui/material';
import React, { useState } from 'react';

import { ConditionAddButton } from '../../bot-config-editor/conditions/ConditionAddButton';
import { ConditionAddDialog } from '../../bot-config-editor/conditions/dialog/ConditionAddDialog';
import { WizardBotCondition } from '../../bot-config-editor/conditions/WizardBotCondition';

type Props = {
    conditions: BotWizardCondition[];
    onConditionRemove: (idx: number) => void;
    onConditionAdd: (condition: BotWizardCondition) => void;
};

export const ConditionSection = ({ conditions, onConditionRemove, onConditionAdd }: Props) => {
    const [conditionAddDialogOpen, setConditionAddDialogOpen] = useState(false);

    const canConditionsBeAdded = conditions.length < 9;

    return (
        <>
            <Box sx={{ margin: '8px', marginTop: '-12px', display: 'flex', flexWrap: 'wrap' }}>
                {conditions.map((condition, idx) => (
                    <WizardBotCondition key={idx} condition={condition} remove={() => onConditionRemove(idx)} />
                ))}
                {canConditionsBeAdded && (
                    <ConditionAddButton
                        sx={{ marginTop: '12px', marginBottom: 0 }}
                        onClick={() => setConditionAddDialogOpen(true)}
                    />
                )}
            </Box>
            <ConditionAddDialog
                open={conditionAddDialogOpen}
                onClose={() => setConditionAddDialogOpen(false)}
                trigger={NftEventType.Listing}
                addCondition={onConditionAdd}
            />
        </>
    );
};
