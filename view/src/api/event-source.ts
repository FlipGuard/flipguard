import { fetchEventSource } from '@microsoft/fetch-event-source';

import { ACCESS_TOKEN_KEY } from '../config/constants/local-storage';

export const getEventSource = (path: string) => {
    let baseUrl = import.meta.env.VITE_API_PROXY ?? '';
    if (baseUrl.endsWith('/')) {
        baseUrl = baseUrl.slice(0, -1);
    }

    const eventTarget = new EventTarget();
    const abortController = new AbortController();

    fetchEventSource(baseUrl + path, {
        headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}` },
        signal: abortController.signal,
        openWhenHidden: true,
        onmessage: (e) => eventTarget.dispatchEvent(new MessageEvent(e.event, { data: e.data })),
        onclose: () => {
            // Throwing an error here will cause the automatic retry after 1 second
            // via onerror callback (which, if not provided, retries on every error)
            throw new Error('Connection closed by the server');
        },
    });

    return { ev: eventTarget, close: () => abortController.abort() };
};
