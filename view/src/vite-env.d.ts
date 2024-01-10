/// <reference types="vite/client.d.ts" />

interface ImportMetaEnv {
    readonly VITE_API_PROXY: string;
    readonly VITE_WALLET_CONNECT_PROJECT_ID: string;
    readonly VITE_DEFAULT_COINFLIP_ROOM_ID: string;
    readonly VITE_NONSTACKABLE_ITEMS_MAX_OVERLAP_DAYS: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
