import LinkOffOutlinedIcon from '@mui/icons-material/LinkOffOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, IconButton, Link, Typography } from '@mui/material';
import React, { useState } from 'react';

import { FadingTooltip } from '../../../components/atoms/feedback/tooltip/FadingTooltip';
import { TertiaryButton } from '../../../components/atoms/inputs/button/TertiaryButton';
import { ACCESS_TOKEN_KEY } from '../../../config/constants/local-storage';
import { useAuth } from '../../../hooks/use-auth';
import { setCookie } from '../../../utils/cookies';
import { getDomainFromUrl } from '../../../utils/urls';
import { UnlinkTwitterConfirmationDialog } from './UnlinkTwitterConfirmationDialog';

export const LinkedSocialsTabCard = () => {
    const { user } = useAuth();

    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
    const [isTwitterButtonLoading, setIsTwitterButtonLoading] = useState(false);

    const onTwitterLink = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsTwitterButtonLoading(true);
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) ?? '';
        const domain = getDomainFromUrl(import.meta.env.VITE_API_PROXY);
        setCookie(ACCESS_TOKEN_KEY, accessToken, { domain, path: '/', maxAge: 30, allowSubdomains: true });
        const href = (e.target as unknown as { href: string }).href;
        window.open(href, '_self');
    };

    return (
        <Box sx={{ margin: '8px', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
            <TwitterIcon />
            <Typography sx={{ marginLeft: '4px' }}>Twitter</Typography>
            <Typography sx={{ flexGrow: 1 }} />
            {user.model.twitter === undefined ? (
                <TertiaryButton loading={isTwitterButtonLoading} size={'small'}>
                    <Link
                        sx={{ color: '#fff', textDecoration: 'none', opacity: isTwitterButtonLoading ? 0 : 1 }}
                        href={`${import.meta.env.VITE_API_PROXY}/auth/twitter/link`}
                        onClick={onTwitterLink}
                    >
                        Link Twitter
                    </Link>
                </TertiaryButton>
            ) : (
                <>
                    <FadingTooltip title={'Unlink Twitter'} placement={'top'}>
                        <IconButton
                            onClick={() => setIsConfirmationDialogOpen(true)}
                            sx={{
                                marginRight: '12px',
                                padding: '0 2px',
                                borderRadius: '6px',
                                '&:hover': { background: 'transparent' },
                            }}
                        >
                            <LinkOffOutlinedIcon
                                sx={(theme) => ({ '&:hover': { color: theme.palette.error.light } })}
                            />
                        </IconButton>
                    </FadingTooltip>
                    <Typography>{`@${user.model.twitter.username}`}</Typography>
                </>
            )}
            <UnlinkTwitterConfirmationDialog
                open={isConfirmationDialogOpen}
                handleClose={() => setIsConfirmationDialogOpen(false)}
            />
        </Box>
    );
};
