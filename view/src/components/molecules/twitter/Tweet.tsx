import { Avatar, Box, styled } from '@mui/material';

import { CommentIcon } from './icons/CommentIcon';
import { LikeIcon } from './icons/LikeIcon';
import { RetweetIcon } from './icons/RetweetIcon';
import { ShareIcon } from './icons/ShareIcon';
import { TweetMarkdown, TwitterText } from './TweetMarkdown';

const TweetBase = styled(Box)({
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: '4px',
    padding: '12px 16px',
    maxWidth: '100%',
});

const TweetHeader = styled(Box)({
    display: 'flex',
});

const TweetContent = styled(Box)({
    color: '#0F1419',
    overflowWrap: 'anywhere',
    paddingTop: '4px',
});

const TweetFooter = styled(Box)({
    color: '#536471',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '6px',
    margin: '0 12px',
});

const IconWrapper = styled(Box)({
    display: 'flex',
    '& svg': {
        width: '20px',
        height: '20px',
    },
    '& p': {
        marginLeft: '6px',
        fontSize: '13px',
    },
});

type Props = {
    name: string;
    handle: string;
    avatar?: string;
    content?: string;
    image?: string;
    hideAvatar?: boolean;
    hideName?: boolean;
};

export const Tweet = ({ name, handle, avatar, content, image, hideAvatar, hideName }: Props) => {
    return (
        <TweetBase>
            {!hideAvatar && !hideName && (
                <Avatar src={avatar} sx={{ width: '48px', height: '48px', marginRight: '12px' }} />
            )}
            <Box sx={{ paddingRight: !hideAvatar ? '48px' : 0 }}>
                {!hideName && (
                    <TweetHeader>
                        <Box sx={{ display: 'flex' }}>
                            <TwitterText sx={{ fontWeight: 700, color: '#0F1419' }}>{name}</TwitterText>
                            <TwitterText sx={{ marginLeft: '8px', color: '#536471' }}>{`@${handle} · 4h`}</TwitterText>
                        </Box>
                    </TweetHeader>
                )}
                <TweetContent>
                    <TweetMarkdown>{content ?? ''}</TweetMarkdown>
                    {image && (
                        <img
                            alt={'Tweet image'}
                            src={image}
                            style={{ borderRadius: '6px', maxWidth: '100%', marginTop: '12px' }}
                        />
                    )}
                </TweetContent>
                <TweetFooter>
                    <IconWrapper>
                        <CommentIcon />
                        <TwitterText>64</TwitterText>
                    </IconWrapper>
                    <IconWrapper>
                        <RetweetIcon />
                        <TwitterText>64</TwitterText>
                    </IconWrapper>
                    <IconWrapper>
                        <LikeIcon />
                        <TwitterText>64</TwitterText>
                    </IconWrapper>
                    <IconWrapper>
                        <ShareIcon />
                    </IconWrapper>
                </TweetFooter>
            </Box>
        </TweetBase>
    );
};
