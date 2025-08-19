export interface Kitty {
  id: string;
  url: string;
}

export interface FavoriteKitty {
  id: number;
  image: Kitty;
  sub_id: string;
}

export interface NormalizedFavorites {
  kittys: Kitty[],
  favMap: Map<string, number>;
}

export interface ApiResponse {
  message: string;
}

export interface AddFavoriteResponse extends ApiResponse {
  id: number;
}
