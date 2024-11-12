/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_TITLE_SUFFIX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
