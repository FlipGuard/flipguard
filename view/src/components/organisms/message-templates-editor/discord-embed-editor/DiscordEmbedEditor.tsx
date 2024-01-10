import { DiscordEmbedTemplate } from '@flipguard/webapp-api';
import { Box, Grid, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

import isViewMobile from '../../../../hooks/utils/isViewMobile';
import { CustomCheckbox } from '../../../atoms/inputs/checkbox/CustomCheckbox';
import { ColorPicker } from '../../../atoms/inputs/color-picker/ColorPicker';
import { CustomRadioGroup } from '../../../atoms/inputs/radio-group/CustomRadioGroup';
import { InputLikeBox } from '../../../molecules/utils/InputLikeBox';
import { DiscordEmbedPreview } from '../discord-embed-preview/DiscordEmbedPreview';
import { FieldsInput } from './fields/FieldsInput';
import { DescriptionInput } from './inputs/DescriptionInput';
import { TitleInput } from './inputs/TitleInput';
import { TitleUrlInput } from './inputs/TitleUrlInput';

const FALLBACK_COLOR = '#d6b078';

type Props = {
    template: DiscordEmbedTemplate;
    onChange: Dispatch<SetStateAction<DiscordEmbedTemplate>>;
};

export const DiscordEmbedEditor = ({ template, onChange }: Props) => {
    const isMobile = isViewMobile('sm');

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                <Box component={'form'} sx={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
                    <TitleInput
                        value={template.title}
                        onChange={(title) => onChange((prev) => ({ ...prev, title: title }))}
                    />
                    <TitleUrlInput
                        value={template.url ?? ''}
                        onChange={(titleUrl) => onChange((prev) => ({ ...prev, url: titleUrl }))}
                    />
                    <DescriptionInput
                        value={template.description}
                        onChange={(description) => onChange((prev) => ({ ...prev, description: description }))}
                    />
                    <InputLikeBox label={'Fields'} sx={{ margin: '12px 8px' }}>
                        <FieldsInput fields={template.fields} onChange={onChange} />
                    </InputLikeBox>
                    <Box sx={{ margin: '0 8px 8px 8px', display: 'flex', flexWrap: 'wrap', textAlign: 'center' }}>
                        <Box
                            sx={{
                                marginRight: '16px',
                                marginTop: '8px',
                                marginBottom: '8px',
                            }}
                        >
                            <ColorPicker
                                color={template.color.startsWith('#') ? template.color : FALLBACK_COLOR}
                                onChange={(color) => onChange((prev) => ({ ...prev, color: color }))}
                            />
                        </Box>
                        <CustomRadioGroup
                            value={template.color.startsWith('#') ? '' : template.color}
                            onChange={(option) => onChange((prev) => ({ ...prev, color: option }))}
                            radios={[
                                { value: 'Random', label: 'Random' },
                                { value: 'Marketplace', label: 'Marketplace' },
                            ]}
                            row
                        />
                        <Typography sx={{ flexGrow: 1 }} />
                        <CustomCheckbox
                            checked={template.includeMedia}
                            onChange={(include) => onChange((prev) => ({ ...prev, includeMedia: include }))}
                            label={'Include image'}
                            boxProps={{
                                sx: {
                                    marginTop: '8px',
                                    marginBottom: '8px',
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: isMobile ? '0' : '8px' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '12px 8px',
                            marginTop: isMobile ? '0' : '12px',
                        }}
                    >
                        <DiscordEmbedPreview template={template} asMessage={false} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};
