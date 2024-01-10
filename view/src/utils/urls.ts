export const getDomainFromUrl = (url: string) => {
    const withoutScheme = url.substring(url.indexOf('//') + 2);
    const withoutPath = withoutScheme.substring(0, withoutScheme.indexOf('/')) || withoutScheme;
    const withoutPort = withoutPath.includes(':') ? withoutPath.split(':')[0] : withoutPath;
    return withoutPort.split('.').slice(-2).join('.');
};
