import { useEffect, useState } from 'react';

export const useDelay = (millis: number) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, millis);

        return () => clearTimeout(timer);
    }, []);

    return show;
};
