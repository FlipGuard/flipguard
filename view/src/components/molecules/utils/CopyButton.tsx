import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { IconButton, IconButtonProps } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { FadingTooltip } from '../../atoms/feedback/tooltip/FadingTooltip';

type Props = IconButtonProps & {
    label?: string;
    messageOnCopy?: string;
    valueToCopy: string;
};

export const CopyButton = ({ label = 'Copy', messageOnCopy = 'Copied!', valueToCopy, ...props }: Props) => {
    const [tooltipMsg, setTooltipMsg] = useState(label);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (tooltipMsg === messageOnCopy) {
            timer = setTimeout(() => {
                setTooltipMsg(label);
            }, 1000);
        }

        return () => clearTimeout(timer);
    }, [tooltipMsg]);

    return (
        <FadingTooltip title={tooltipMsg} placement={'top'}>
            <IconButton
                {...props}
                onClick={() => {
                    navigator.clipboard.writeText(valueToCopy).then(() => {
                        setTooltipMsg(messageOnCopy);
                    });
                }}
            >
                <ContentCopyOutlinedIcon fontSize={'small'} />
            </IconButton>
        </FadingTooltip>
    );
};
