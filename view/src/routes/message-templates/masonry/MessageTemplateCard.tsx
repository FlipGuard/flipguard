import { MessageTemplate, MessageTemplateType } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'wouter';

import { DiscordEmbedPreview } from '../../../components/organisms/message-templates-editor/discord-embed-preview/DiscordEmbedPreview';
import { TwitterPostPreview } from '../../../components/organisms/message-templates-editor/twitter-post-preview/TwitterPostPreview';
import { RoutePath } from '../../../config/constants/navigation';
import { formatTimeAgo } from '../../../utils/timestamps';
import { EventTypeChip } from '../chips/EventTypeChips';
import { MessageTypeChip } from '../chips/MessageTypeChips';
import { MessageTemplateDeleteDialog } from '../MessageTemplateDeleteDialog';

type Props = {
    template: MessageTemplate;
};

export const MessageTemplateCard = ({ template }: Props) => {
    const [, setLocation] = useLocation();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

    const getMedia = () => {
        const { messageType, value } = template;
        switch (messageType) {
            case MessageTemplateType.DISCORD_EMBED:
                return (
                    <Box sx={{ padding: '0 4px' }}>
                        <DiscordEmbedPreview template={value} />
                    </Box>
                );
            case MessageTemplateType.TWITTER_TWEET:
                return (
                    <Box sx={{ padding: '8px 4px' }}>
                        <TwitterPostPreview template={value} hideAvatar={true} hideName={true} />
                    </Box>
                );
        }
    };

    return (
        <Card>
            <CardContent sx={{ marginBottom: '-18px', wordBreak: 'break-word' }}>
                <Typography variant={'h6'} gutterBottom>
                    {template.id}
                </Typography>
            </CardContent>
            <CardMedia
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '8px 12px',
                    marginBottom: '-20px',
                }}
            >
                {getMedia()}
            </CardMedia>
            <CardContent sx={{ marginBottom: '-12px', wordBreak: 'break-all' }}>
                <Box sx={{ display: 'flex', alignItems: 'start', marginTop: '12px' }}>
                    <MessageTypeChip type={template.messageType} />
                    <EventTypeChip type={template.eventType} sx={{ marginLeft: '8px' }} />
                </Box>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ paddingLeft: '8px' }}>
                    <Typography
                        sx={(theme) => ({ fontSize: '13px', color: theme.palette.tertiaryButton.dark })}
                    >{`Updated ${formatTimeAgo(template.updatedAt, false)}`}</Typography>
                </Box>
                <Box>
                    <IconButton onClick={() => setLocation(RoutePath.MessageTemplatesEdit + '/' + template.id)}>
                        <EditOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={() => setDeleteDialogOpen(true)}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Box>
            </CardActions>
            <MessageTemplateDeleteDialog
                template={template}
                open={deleteDialogOpen}
                handleClose={() => setDeleteDialogOpen(false)}
            />
        </Card>
    );
};
