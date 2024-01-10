import {
    DiscordEmbedFieldTemplate,
    DiscordEmbedTemplate,
    discordEmbedTemplateConstraints,
} from '@flipguard/webapp-api';
import { Box } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

import { FieldAddButton } from './FieldAddButton';
import { MemoizedFieldInput } from './FieldInput';

type FieldsProps = {
    fields: DiscordEmbedFieldTemplate[];
    onChange: Dispatch<SetStateAction<DiscordEmbedTemplate>>;
};

export const FieldsInput = ({ fields, onChange }: FieldsProps) => {
    const onAdd = () =>
        onChange((prev) => {
            const prevFields = prev.fields;
            return { ...prev, fields: [...prevFields, { name: '', value: '', inline: true }] };
        });

    const updateField = (idx: number, newField: DiscordEmbedFieldTemplate) => {
        onChange((prev) => {
            const prevFields = prev.fields;
            const newFields = [];
            for (let i = 0; i < prevFields.length; i++) {
                newFields.push(i === idx ? newField : prevFields[i]);
            }
            return { ...prev, fields: newFields };
        });
    };

    const deleteField = (idx: number) => {
        onChange((prev) => {
            const prevFields = prev.fields;
            const newFields = [];
            for (let i = 0; i < prevFields.length; i++) {
                if (i !== idx) newFields.push(prevFields[i]);
            }
            return { ...prev, fields: newFields };
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {fields.map((field, idx) => (
                <MemoizedFieldInput
                    key={idx}
                    field={field}
                    onChange={(updatedField) => updateField(idx, updatedField)}
                    onDelete={() => deleteField(idx)}
                />
            ))}
            {fields.length < discordEmbedTemplateConstraints.fields.maxLength && <FieldAddButton onClick={onAdd} />}
        </Box>
    );
};
