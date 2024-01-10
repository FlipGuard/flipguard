import { TwitterBotSecrets, twitterBotSecretsConstraints } from '@flipguard/webapp-api';
import { Box } from '@mui/material';
import React, { useState } from 'react';

import { CustomTextField } from '../../../components/atoms/inputs/text-field/CustomTextField';

type Props = {
    value: TwitterBotSecrets;
    onChange: (value: TwitterBotSecrets) => void;
};

export const TwitterBotEditForm = ({ value, onChange }: Props) => {
    const apiKey = value.apiKey;
    const apiSecret = value.apiSecret;
    const accessTokenKey = value.accessTokenKey;
    const accessTokenSecret = value.accessTokenSecret;

    const [showSecret1, setShowSecret1] = useState(false);
    const [showSecret2, setShowSecret2] = useState(false);
    const [showSecret3, setShowSecret3] = useState(false);
    const [showSecret4, setShowSecret4] = useState(false);

    return (
        <Box sx={{ margin: '12px 8px' }}>
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
                showSecret={showSecret1}
                setShowSecret={setShowSecret1}
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
                showSecret={showSecret2}
                setShowSecret={setShowSecret2}
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
                showSecret={showSecret3}
                setShowSecret={setShowSecret3}
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
                showSecret={showSecret4}
                setShowSecret={setShowSecret4}
                required
            />
        </Box>
    );
};
