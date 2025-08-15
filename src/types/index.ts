export interface Kitty {
  id: string;
  url: string;
}

export interface FavorKitty {
  id: string;
  image: Kitty;
  sub_id: string;
}