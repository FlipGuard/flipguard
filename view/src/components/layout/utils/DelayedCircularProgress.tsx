import { CircularProgress, CircularProgressProps } from '@mui/material';
import React, { useEffect, useState } from 'react';

export const DelayedCircularProgress = (props: CircularProgressProps) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (!show) {
        return null;
    }

    return <CircularProgress {...props} />;
};
