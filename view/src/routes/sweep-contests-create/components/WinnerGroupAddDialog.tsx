import {
    getWinnerGroupTypeName,
    MAX_WINNER_GROUP_NAME_LENGTH,
    SweepContestWinnerGroupType,
    WinnerGroup,
} from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';

import { CustomDialog } from '../../../components/atoms/feedback/dialog/CustomDialog';
import { PrimaryButton } from '../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../components/atoms/inputs/button/TertiaryButton';
import { CustomRadioGroup } from '../../../components/atoms/inputs/radio-group/CustomRadioGroup';
import { CustomNumericTextField } from '../../../components/atoms/inputs/text-field/CustomNumericTextField';
import { CustomTextField } from '../../../components/atoms/inputs/text-field/CustomTextField';
import { InputLikeBox } from '../../../components/molecules/utils/InputLikeBox';
import isViewMobile from '../../../hooks/utils/isViewMobile';

const WINNER_GROUP_TYPE_TOOLTIPS: Record<SweepContestWinnerGroupType, string> = {
    WEIGHTED_RANDOM: `
        Winners will be selected randomly based on number of entries (for quantity based sweep contests) 
        or generated volume (for volume based sweep contests)
    `,
    RANDOM: `
        Winners will be selected in a totally random manner
    `,
    BEST_SCORE: `
        Winners will be selected by their position in the leaderboard
    `,
};

const INITIAL_CONFIG: WinnerGroup = {
    name: '',
    winners: 3,
    type: SweepContestWinnerGroupType.WEIGHTED_RANDOM,
};

type Props = {
    open: boolean;
    onClose: () => void;
    existingNames: string[];
    addWinnerGroup: (winnerGroup: WinnerGroup) => void;
};

export const WinnerGroupAddDialog = ({ open, onClose, existingNames, addWinnerGroup }: Props) => {
    const isMobile = isViewMobile();

    const [winnerGroup, setWinnerGroup] = useState<WinnerGroup>(INITIAL_CONFIG);

    const handleClose = () => {
        onClose();
        setWinnerGroup(INITIAL_CONFIG);
    };

    const isDuplicateName = existingNames.includes(winnerGroup.name);

    return (
        <CustomDialog
            sx={{ '& .MuiPaper-root': { width: isMobile ? 'auto' : '520px' } }}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '12px 6px 12px 12px',
                    wordBreak: 'break-word',
                }}
            >
                Add winner group
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={handleClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '12px',
                    paddingRight: '16px',
                }}
            >
                <CustomTextField
                    sx={{ margin: '8px 0' }}
                    name={'Group Name'}
                    label={'Group Name'}
                    placeholder={'Random buyers, top sweeper etc.'}
                    value={winnerGroup.name}
                    onChange={(e) => setWinnerGroup((prev) => ({ ...prev, name: e.target.value }))}
                    inputProps={{ maxLength: MAX_WINNER_GROUP_NAME_LENGTH }}
                    error={isDuplicateName}
                    helperText={isDuplicateName ? 'Winner group with this name already exists' : undefined}
                    required
                />
                <CustomNumericTextField
                    sx={{ margin: '8px 0' }}
                    label={'Number of winners'}
                    value={winnerGroup.winners}
                    onValueChange={(v) => setWinnerGroup((prev) => ({ ...prev, winners: v }))}
                    minValue={1}
                    maxValue={100}
                />
                <InputLikeBox
                    label={'Winner picking strategy'}
                    sx={(theme) => ({
                        margin: '8px 0',
                        padding: '8px 16px',
                        '& .MuiFormLabel-root': {
                            background: theme.palette.primary.light,
                        },
                    })}
                >
                    <CustomRadioGroup
                        sx={{ display: 'flex', flexDirection: 'column' }}
                        radios={Object.values(SweepContestWinnerGroupType).map((type) => ({
                            value: type,
                            label: getWinnerGroupTypeName(type),
                            tooltipMessage: WINNER_GROUP_TYPE_TOOLTIPS[type],
                            tooltipPlacement: 'right',
                        }))}
                        onChange={(v) =>
                            setWinnerGroup((prev) => ({ ...prev, type: v as SweepContestWinnerGroupType }))
                        }
                        value={winnerGroup.type}
                        row
                    />
                </InputLikeBox>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'space-between',
                    padding: '12px',
                }}
            >
                <TertiaryButton onClick={handleClose}>Cancel</TertiaryButton>
                <PrimaryButton
                    disabled={winnerGroup.name === ''}
                    onClick={() => {
                        addWinnerGroup(winnerGroup);
                        handleClose();
                    }}
                >
                    Add
                </PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
