const DURATION_SECONDS = 7 * 24 * 3600;

export const saveRefCodeCookie = (refCode: string) => {
    document.cookie = `_ref=${refCode};max-age=${DURATION_SECONDS}`;
};

export const getRefCodeFromCookie = () => {
    const cookie = document.cookie.split('; ').find((c) => c.startsWith('_ref='));
    return cookie ? cookie.split('=')[1] : undefined;
};
