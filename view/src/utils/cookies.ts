type CookieConfig = {
    path?: string;
    domain: string;
    maxAge: number;
    allowSubdomains?: boolean;
};

export const setCookie = (name: string, value: string, { path, domain, maxAge, allowSubdomains }: CookieConfig) => {
    if (domain === 'localhost') {
        domain = '';
    } else if (allowSubdomains) {
        domain = '.' + domain;
    }

    document.cookie = `${name}=${value};path=${path};domain=${domain};max-age=${maxAge}`;
};

export const getCookieByName = (name: string) => {
    const cookie = document.cookie.split('; ').find((c) => c.startsWith(name));
    return cookie ? cookie.split('=')[1] : undefined;
};
