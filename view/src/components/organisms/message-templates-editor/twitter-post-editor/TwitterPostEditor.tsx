import { TweetTemplate, tweetTemplateConstraints } from '@flipguard/webapp-api';
import { Box, Grid } from '@mui/material';
import React from 'react';

import isViewMobile from '../../../../hooks/utils/isViewMobile';
import { CustomCheckbox } from '../../../atoms/inputs/checkbox/CustomCheckbox';
import { CustomTextField } from '../../../atoms/inputs/text-field/CustomTextField';
import { TwitterPostPreview } from '../twitter-post-preview/TwitterPostPreview';

type Props = {
    value: TweetTemplate;
    onChange: (template: TweetTemplate) => void;
};

export const TwitterPostEditor = ({ value, onChange }: Props) => {
    const isMobile = isViewMobile('sm');

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                <Box component={'form'} sx={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
                    <CustomTextField
                        name={'Tweet Content'}
                        label={'Content'}
                        sx={{
                            margin: '12px 8px',
                            width: 'auto',
                        }}
                        value={value.description}
                        onChange={(e) => onChange({ ...value, description: e.target.value })}
                        inputProps={{
                            maxLength: tweetTemplateConstraints.description.max,
                        }}
                        multiline
                    />
                    <Box sx={{ margin: '0 8px 8px 8px', display: 'flex', flexWrap: 'wrap', textAlign: 'center' }}>
                        <CustomCheckbox
                            checked={value.includeMedia}
                            onChange={(include) => onChange({ ...value, includeMedia: include })}
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
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: isMobile ? '0' : '16px' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '12px 8px',
                            marginTop: isMobile ? '0' : '12px',
                        }}
                    >
                        <TwitterPostPreview template={value} hideAvatar={true} hideName={true} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};
