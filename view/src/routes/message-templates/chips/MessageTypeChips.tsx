import { MessageTemplateType } from '@flipguard/webapp-api';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Chip, ChipProps } from '@mui/material';

import { DiscordIcon } from '../../../components/atoms/data-display/icons/DiscordIcon';

export const MessageTypeChip = (props: { type: MessageTemplateType } & ChipProps) => {
    const { type } = props;

    switch (type) {
        case MessageTemplateType.DISCORD_EMBED:
            return <DiscordEmbedChip {...props} />;
        case MessageTemplateType.TWITTER_TWEET:
            return <TweetChip {...props} />;
        default:
            return null;
    }
};

const DiscordEmbedChip = (props: ChipProps) => {
    const { sx: sxProps, ...rest } = props;

    return (
        <Chip
            icon={
                <DiscordIcon
                    sx={{
                        marginLeft: '9px !important',
                    }}
                />
            }
            label={'Embed'}
            sx={{
                backgroundColor: '#5771c9',
                fontWeight: '300',
                ...sxProps,
            }}
            {...rest}
        />
    );
};

const TweetChip = (props: ChipProps) => {
    const { sx: sxProps, ...rest } = props;

    return (
        <Chip
            icon={
                <TwitterIcon
                    sx={{
                        marginLeft: '9px !important',
                    }}
                />
            }
            label={'Tweet'}
            sx={{
                backgroundColor: '#1da1f2',
                fontWeight: '300',
                ...sxProps,
            }}
            {...rest}
        />
    );
};
