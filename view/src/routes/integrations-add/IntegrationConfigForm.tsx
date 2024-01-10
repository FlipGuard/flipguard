import { DiscordWebhook, IntegrationType, TwitterBotSecrets, Webhook } from '@flipguard/webapp-api';
import React from 'react';

import { DiscordWebhookAddForm } from './forms/DiscordWebhookAddForm';
import { TwitterBotAddForm } from './forms/TwitterBotAddForm';
import { WebhookAddForm } from './forms/WebhookAddForm';

type CommonProps = {
    showDescription: boolean;
};

type Props =
    | (CommonProps & {
          type: IntegrationType.DISCORD_WEBHOOK;
          value: DiscordWebhook;
          onChange: (value: DiscordWebhook) => void;
      })
    | (CommonProps & {
          type: IntegrationType.TWITTER_BOT;
          value: TwitterBotSecrets;
          onChange: (value: TwitterBotSecrets) => void;
      })
    | (CommonProps & {
          type: IntegrationType.WEBHOOK;
          value: Webhook;
          onChange: (value: Webhook) => void;
      });

export const IntegrationConfigForm = ({ type, value, onChange }: Props) => {
    switch (type) {
        case IntegrationType.DISCORD_WEBHOOK:
            return <DiscordWebhookAddForm value={value} onChange={onChange} />;
        case IntegrationType.TWITTER_BOT:
            return <TwitterBotAddForm value={value} onChange={onChange} />;
        case IntegrationType.WEBHOOK:
            return <WebhookAddForm value={value} onChange={onChange} />;
        default:
            return null;
    }
};
