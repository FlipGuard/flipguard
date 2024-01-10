import {
    DiscordEmbedTemplate,
    MessageTemplateType,
    PossibleMessageTemplateValues,
    TweetTemplate,
} from '@flipguard/webapp-api';
import React, { Dispatch, SetStateAction } from 'react';

import { DiscordEmbedEditor } from './discord-embed-editor/DiscordEmbedEditor';
import { TwitterPostEditor } from './twitter-post-editor/TwitterPostEditor';

type Props = {
    type: MessageTemplateType;
    template: PossibleMessageTemplateValues;
    onChange: Dispatch<SetStateAction<PossibleMessageTemplateValues>>;
};

export const MessageTemplateEditor = ({ type, template, onChange }: Props) => {
    switch (type) {
        case MessageTemplateType.DISCORD_EMBED:
            return (
                <DiscordEmbedEditor
                    template={template as DiscordEmbedTemplate}
                    onChange={onChange as Dispatch<SetStateAction<DiscordEmbedTemplate>>}
                />
            );
        case MessageTemplateType.TWITTER_TWEET:
            return <TwitterPostEditor value={template as TweetTemplate} onChange={(value) => onChange(value)} />;
        default:
            return null;
    }
};
