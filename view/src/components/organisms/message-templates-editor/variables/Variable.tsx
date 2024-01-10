import { Box, Chip } from '@mui/material';
import { useEffect, useState } from 'react';

import { FadingTooltip } from '../../../atoms/feedback/tooltip/FadingTooltip';

const COPY_MESSAGE = 'Copied!';

export type VariableType = {
    name: string;
    description: string;
    dynamic?: boolean;
};

export const Variable = ({ name, description, dynamic }: VariableType) => {
    const [tooltipMsg, setTooltipMsg] = useState(description);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (tooltipMsg === COPY_MESSAGE) {
            timer = setTimeout(() => {
                setTooltipMsg(description);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [tooltipMsg]);

    return (
        <Box
            onClick={() => {
                const braces = dynamic ? '[Background]' : '';
                navigator.clipboard.writeText('{' + name + braces + '}').then(() => {
                    setTooltipMsg(COPY_MESSAGE);
                });
            }}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '4px 4px',
            }}
        >
            <FadingTooltip title={tooltipMsg} placement={'top'}>
                <Chip
                    sx={(theme) => ({
                        borderRadius: '8px',
                        background: theme.palette.chip.main,
                        '&:hover': {
                            cursor: 'pointer',
                            background: theme.palette.chip.dark,
                        },
                    })}
                    label={name}
                />
            </FadingTooltip>
        </Box>
    );
};
