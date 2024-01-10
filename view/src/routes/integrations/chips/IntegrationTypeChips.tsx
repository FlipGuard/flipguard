import { IntegrationType } from '@flipguard/webapp-api';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import WebhookOutlinedIcon from '@mui/icons-material/WebhookOutlined';
import { Chip } from '@mui/material';

import { DiscordIcon } from '../../../components/atoms/data-display/icons/DiscordIcon';

type Props = {
    type: IntegrationType;
};

export const IntegrationTypeChip = ({ type }: Props) => {
    switch (type) {
        case IntegrationType.DISCORD_WEBHOOK:
            return <DiscordWebhookChip />;
        case IntegrationType.TWITTER_BOT:
            return <TwitterBotChip />;
        case IntegrationType.BURNER_WALLET:
            return <WalletChip />;
        case IntegrationType.WEBHOOK:
            return <WebhookChip />;
        default:
            return null;
    }
};

const DiscordWebhookChip = () => {
    return (
        <Chip
            icon={
                <DiscordIcon
                    sx={{
                        marginLeft: '9px !important',
                    }}
                />
            }
            label={'Webhook'}
            sx={{
                backgroundColor: '#5771c9',
            }}
        />
    );
};

const TwitterBotChip = () => {
    return (
        <Chip
            icon={
                <TwitterIcon
                    sx={{
                        marginLeft: '9px !important',
                    }}
                />
            }
            label={'Bot'}
            sx={{
                backgroundColor: '#1DA1F2',
            }}
        />
    );
};

const WalletChip = () => {
    return (
        <Chip
            icon={
                <LocalFireDepartmentOutlinedIcon
                    sx={{
                        marginLeft: '9px !important',
                    }}
                />
            }
            label={'Burner'}
            sx={{
                backgroundColor: '#b33d26',
            }}
        />
    );
};

const WebhookChip = () => {
    return (
        <Chip
            icon={
                <WebhookOutlinedIcon
                    sx={{
                        marginLeft: '9px !important',
                    }}
                />
            }
            label={'Webhook'}
            sx={{
                backgroundColor: '#368b56',
            }}
        />
    );
};
