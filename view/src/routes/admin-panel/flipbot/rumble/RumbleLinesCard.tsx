import { capitalize } from '@flipguard/commons';
import { FlipBotGlobalRumbleConfig, FlipBotGlobalRumbleConfigUpdateDto } from '@flipguard/webapp-api';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, Card, InputAdornment } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useGlobalRumbleSettingsUpdateMutation } from '../../../../api/mutations/flipbot-global-config';
import { PrimaryButton } from '../../../../components/atoms/inputs/button/PrimaryButton';
import { CustomSelect } from '../../../../components/atoms/inputs/select/CustomSelect';
import { CustomTextField } from '../../../../components/atoms/inputs/text-field/CustomTextField';
import { displaySuccessToast } from '../../../../utils/toasts';
import { AddRumbleLineDialog } from './components/AddRumbleLineDialog';
import { EditRumbleLineDialog } from './components/EditRumbleLineDialog';
import { RumbleLinesTable } from './table/RumbleLinesTable';

type LineKey = keyof FlipBotGlobalRumbleConfig['lines'];

const RumbleEvent: Record<string, LineKey> = {
    MURDER: 'murder',
    DEATH: 'death',
    REVIVE: 'revive',
    NEUTRAL: 'neutral',
};

type Props = {
    settings: FlipBotGlobalRumbleConfig;
};

export const AdminPanelRumbleLinesCard = ({ settings }: Props) => {
    const updateMutation = useGlobalRumbleSettingsUpdateMutation();

    const [searchText, setSearchText] = useState('');
    const [event, setEvent] = useState(RumbleEvent.MURDER);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(-1);

    const eventsLines = settings.lines[event];

    useEffect(() => {
        setSearchText('');
    }, [event]);

    const onLineAdd = (line: string) => {
        const dto: FlipBotGlobalRumbleConfigUpdateDto = {
            ...settings,
            lines: {
                ...settings.lines,
                [event]: [...settings.lines[event], line],
            },
        };

        updateMutation.mutate(dto, {
            onSuccess: () => {
                setAddDialogOpen(false);
                displaySuccessToast('Rumble line has been added');
            },
        });
    };

    const onLineEdit = (idx: number, line: string) => {
        const dto: FlipBotGlobalRumbleConfigUpdateDto = {
            ...settings,
            lines: {
                ...settings.lines,
                [event]: settings.lines[event].map((v, i) => (i === idx ? line : v)),
            },
        };

        updateMutation.mutate(dto, {
            onSuccess: () => {
                setEditDialogOpen(-1);
                displaySuccessToast('Rumble line has been updated');
            },
        });
    };

    const onLineRemove = (idx: number) => {
        const dto: FlipBotGlobalRumbleConfigUpdateDto = {
            ...settings,
            lines: {
                ...settings.lines,
                [event]: settings.lines[event].filter((_, i) => i !== idx),
            },
        };

        updateMutation.mutate(dto, {
            onSuccess: () => {
                setAddDialogOpen(false);
                displaySuccessToast('Rumble line has been removed');
            },
        });
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginBottom: '24px',
                    gap: '0 12px',
                }}
            >
                <Card sx={{ marginBottom: '8px', border: 'none', borderRadius: '4px' }}>
                    <CustomSelect
                        sx={{ minWidth: '128px' }}
                        options={Object.values(RumbleEvent).map((value) => ({
                            label: capitalize(value),
                            value: value,
                        }))}
                        value={event}
                        onChange={(e) => setEvent(e.target.value as LineKey)}
                        select
                    />
                </Card>
                <CustomTextField
                    sx={{ flexGrow: 1, marginBottom: '8px' }}
                    placeholder={'Search'}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlinedIcon sx={{ color: '#666' }} />
                            </InputAdornment>
                        ),
                    }}
                />
                <PrimaryButton sx={{ marginBottom: '8px', height: '40px' }} onClick={() => setAddDialogOpen(true)}>
                    Add Line
                </PrimaryButton>
            </Box>
            <RumbleLinesTable
                lines={eventsLines}
                searchText={searchText}
                onLineRemove={onLineRemove}
                onLineEdit={setEditDialogOpen}
                loading={updateMutation.isLoading}
            />
            <AddRumbleLineDialog
                type={event}
                onAdd={onLineAdd}
                isOpen={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
                loading={updateMutation.isLoading}
            />
            <EditRumbleLineDialog
                type={event}
                onEdit={(line) => onLineEdit(editDialogOpen, line)}
                isOpen={editDialogOpen !== -1}
                onClose={() => setEditDialogOpen(-1)}
                loading={updateMutation.isLoading}
                idx={editDialogOpen}
                initialValue={editDialogOpen >= 0 ? eventsLines[editDialogOpen] : ''}
            />
        </>
    );
};
