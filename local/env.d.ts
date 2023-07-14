// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}