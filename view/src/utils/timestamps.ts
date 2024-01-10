type Division = {
    amount: number;
    name: Intl.RelativeTimeFormatUnit;
};

const DIVISIONS_AGO: Division[] = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: Number.POSITIVE_INFINITY, name: 'days' },
];

export const formatTimeAgo = (timestamp: number, capitalize = true): string => {
    const duration = (Date.now() - timestamp) / 1000;
    if (duration < 5) {
        return capitalize ? 'Just now' : 'just now';
    }

    const result = formatTime(duration, DIVISIONS_AGO) + ' ago';
    return capitalize ? result.charAt(0).toUpperCase() + result.substring(1) : result;
};

export const formatTimeUntil = (timestamp: number, capitalize = true): string => {
    const duration = Math.max(0, (timestamp - Date.now()) / 1000);
    const result = 'in ' + formatTime(duration, DIVISIONS_SINCE);
    return capitalize ? result.charAt(0).toUpperCase() + result.substring(1) : result;
};

const DIVISIONS_SINCE: Division[] = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: Number.POSITIVE_INFINITY, name: 'days' },
];

export const formatTimeSince = (timestamp: number): string => {
    const duration = Math.max(0, (Date.now() - timestamp) / 1000);
    return formatTime(duration, DIVISIONS_SINCE);
};

const formatTime = (duration: number, divisions: Division[]): string => {
    for (let i = 0; i <= divisions.length; i++) {
        const division = divisions[i];
        if (duration < division.amount) {
            const num = Math.floor(duration);
            return num + ' ' + division.name.slice(0, num === 1 ? -1 : undefined);
        }
        duration /= division.amount;
    }

    return '';
};
