import { DiscordEmbedFieldTemplate, discordEmbedFieldTemplateConstraints } from '@flipguard/webapp-api';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Box } from '@mui/material';
import React from 'react';

import { CustomCheckbox } from '../../../../atoms/inputs/checkbox/CustomCheckbox';
import { CustomTextField } from '../../../../atoms/inputs/text-field/CustomTextField';

type Props = {
    field: DiscordEmbedFieldTemplate;
    onChange: (field: DiscordEmbedFieldTemplate) => void;
    onDelete: () => void;
};

const FieldInput = ({ field, onChange, onDelete }: Props) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                width: '100%',
                margin: '8px 0 24px 0',
            }}
        >
            <HighlightOffOutlinedIcon
                sx={(theme) => ({
                    color: '#aaa',
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '50%',
                    zIndex: 2,
                    position: 'absolute',
                    right: -2,
                    top: -6,
                    '&:hover': {
                        cursor: 'pointer',
                        color: '#ddd',
                    },
                })}
                onClick={onDelete}
            />
            <Box
                sx={{
                    display: 'flex',
                }}
            >
                <CustomTextField
                    name={'Field Name'}
                    label={'Label'}
                    sx={{
                        margin: '4px 0px 4px 8px',
                        flexGrow: 1,
                    }}
                    value={field.name}
                    onChange={(e) =>
                        onChange({
                            ...field,
                            name: e.target.value,
                        })
                    }
                    inputProps={{
                        maxLength: discordEmbedFieldTemplateConstraints.name.max,
                    }}
                />
                <CustomCheckbox
                    boxProps={{ sx: { margin: '4px 8px', flexGrow: 1 } }}
                    label={'Inline'}
                    checked={field.inline}
                    onChange={(value) =>
                        onChange({
                            ...field,
                            inline: value,
                        })
                    }
                />
            </Box>
            <CustomTextField
                name={'Field Value'}
                label={'Value'}
                sx={{
                    margin: '8px',
                }}
                value={field.value}
                onChange={(e) =>
                    onChange({
                        ...field,
                        value: e.target.value,
                    })
                }
                inputProps={{
                    maxLength: discordEmbedFieldTemplateConstraints.value.max,
                }}
                multiline
            />
        </Box>
    );
};

export const MemoizedFieldInput = React.memo(FieldInput, (prevProps: Props, nextProps: Props) => {
    const prev = prevProps.field;
    const next = nextProps.field;
    return prev.name === next.name && prev.value === next.value && prev.inline === next.inline;
});
