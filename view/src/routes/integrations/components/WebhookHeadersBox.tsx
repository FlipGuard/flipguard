import { Webhook } from '@flipguard/webapp-api';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Box } from '@mui/material';
import React from 'react';

import { CustomTextField } from '../../../components/atoms/inputs/text-field/CustomTextField';
import { InputLikeBox } from '../../../components/molecules/utils/InputLikeBox';

type Props = {
    webhook: Webhook;
    onChange: (value: Webhook) => void;
};

export const WebhookHeadersBox = ({ webhook, onChange }: Props) => {
    const headerKeys = webhook.headers.map((h) => h.key);
    const headerAddingDisabled = headerKeys.length >= 5;

    return (
        <InputLikeBox label={'Custom headers'} sx={{ marginTop: '24px' }}>
            {webhook.headers.map(({ key, value }, idx) => (
                <HeaderInput
                    key={idx}
                    name={key}
                    onNameChange={(name) => {
                        onChange({
                            ...webhook,
                            headers: webhook.headers.map((h, i) => (i === idx ? { ...h, key: name } : h)),
                        });
                    }}
                    value={value}
                    onValueChange={(newValue) => {
                        onChange({
                            ...webhook,
                            headers: webhook.headers.map((h, i) => (i === idx ? { ...h, value: newValue } : h)),
                        });
                    }}
                    remove={() => {
                        {
                            onChange({
                                ...webhook,
                                headers: webhook.headers.filter((_, i) => i !== idx),
                            });
                        }
                    }}
                />
            ))}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px dashed #555',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    '&:hover': {
                        border: headerAddingDisabled ? '1px dashed #555' : '1px dashed #888',
                        cursor: headerAddingDisabled ? 'not-allowed' : 'pointer',
                    },
                    '&:hover svg': {
                        color: headerAddingDisabled ? 'auto' : '#aaa',
                    },
                }}
                onClick={() => {
                    if (!headerAddingDisabled) {
                        onChange({ ...webhook, headers: [...webhook.headers, { key: '', value: '' }] });
                    }
                }}
            >
                <AddCircleOutlineOutlinedIcon sx={{ color: '#555' }} />
            </Box>
        </InputLikeBox>
    );
};

type HeaderInputProps = {
    name: string;
    onNameChange: (key: string) => void;
    value: string;
    onValueChange: (value: string) => void;
    remove: () => void;
};

const HeaderInput = ({ name, onNameChange, value, onValueChange, remove }: HeaderInputProps) => {
    return (
        <Box sx={{ width: '100%', display: 'flex', marginBottom: '16px' }}>
            <CustomTextField
                sx={{ flexGrow: 1 }}
                name={'Header name'}
                label={'Name'}
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
            />
            <Box sx={{ flexGrow: 1, position: 'relative', marginLeft: '12px' }}>
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
                <CustomTextField
                    sx={{ width: '100%' }}
                    name={'Header value'}
                    label={'Value'}
                    value={value}
                    onChange={(e) => onValueChange(e.target.value)}
                />
            </Box>
        </Box>
    );
};
