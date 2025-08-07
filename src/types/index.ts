export interface Kitty {
  id: string;
  url: string;
}

export interface FavorKitty {
  id: string;
  image: Kitty;
  sub_id: string
}

interface ImportMetaEnv {
  readonly API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}