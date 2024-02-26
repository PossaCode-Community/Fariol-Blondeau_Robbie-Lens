/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLESHEET_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
