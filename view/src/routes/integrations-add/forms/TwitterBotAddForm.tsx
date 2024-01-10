import { TwitterBotSecrets, twitterBotSecretsConstraints } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';
import React from 'react';

import { CustomTextField } from '../../../components/atoms/inputs/text-field/CustomTextField';
import { CustomLink } from '../../../components/atoms/navigation/CustomLink';

const LEARN_MORE_TWITTER_BOT_LINK = 'https://wiki.flipguard.xyz/flipguard-wiki-wip/utilities/integrations/twitter-bot';

const TWITTER_BOT_DESCRIPTION = `
    To integrate with Twitter you need to create a Twitter Bot first.
    Once it's ready simply paste its secret keys below.
`;

type Props = {
    value: TwitterBotSecrets;
    onChange: (value: TwitterBotSecrets) => void;
};

export const TwitterBotAddForm = ({ value, onChange }: Props) => {
    const apiKey = value.apiKey;
    const apiSecret = value.apiSecret;
    const accessTokenKey = value.accessTokenKey;
    const accessTokenSecret = value.accessTokenSecret;

    return (
        <Box sx={{ margin: '12px 8px' }}>
            <Typography sx={{ marginBottom: '8px', fontSize: '13px', color: '#eee' }}>
                {TWITTER_BOT_DESCRIPTION}
            </Typography>
            <Box sx={{ marginBottom: '8px' }}>
                <CustomLink
                    href={LEARN_MORE_TWITTER_BOT_LINK}
                    target={'_blank'}
                    rel={'noreferrer'}
                    sx={{ fontSize: '13px' }}
                >
                    Learn how to set up a Twitter Bot
                </CustomLink>
            </Box>
            <CustomTextField
                name={'API Key'}
                label={'API Key'}
                sx={{
                    width: '100%',
                    margin: '6px 0 8px 0',
                }}
                placeholder={"Your Twitter Developer App's API Key"}
                value={apiKey}
                onChange={(e) => {
                    onChange({ ...value, apiKey: e.target.value });
                }}
                inputProps={{ maxLength: twitterBotSecretsConstraints.apiKey.max }}
                required
            />
            <CustomTextField
                name={'API Key Secret'}
                label={'API Key Secret'}
                sx={{
                    width: '100%',
                    margin: '8px 0 8px 0',
                }}
                placeholder={"Your Twitter Developer App's API Key Secret"}
                value={apiSecret}
                onChange={(e) => {
                    onChange({ ...value, apiSecret: e.target.value });
                }}
                inputProps={{ maxLength: twitterBotSecretsConstraints.apiSecret.max }}
                required
            />
            <CustomTextField
                name={'Access Token'}
                label={'Access Token'}
                sx={{
                    width: '100%',
                    margin: '8px 0 8px 0',
                }}
                placeholder={'The Access Token of your bot'}
                value={accessTokenKey}
                onChange={(e) => {
                    onChange({ ...value, accessTokenKey: e.target.value });
                }}
                inputProps={{ maxLength: twitterBotSecretsConstraints.accessTokenKey.max }}
                required
            />
            <CustomTextField
                name={'Access Token Secret'}
                label={'Access Token Secret'}
                sx={{
                    width: '100%',
                    margin: '8px 0 0 0',
                }}
                placeholder={'The Access Token Secret of your bot'}
                value={accessTokenSecret}
                onChange={(e) => {
                    onChange({ ...value, accessTokenSecret: e.target.value });
                }}
                inputProps={{ maxLength: twitterBotSecretsConstraints.accessTokenSecret.max }}
                required
            />
        </Box>
    );
};
