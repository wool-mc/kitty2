import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { AddFavoriteResponse, ApiResponse, FavoriteKitty, Kitty, NormalizedFavorites } from '../types/index.ts';

if (!import.meta.env.VITE_API_KEY) {
  throw new Error('API key not found in environment variables');
}

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': API_KEY,
  },
});
console.log(API_KEY);

export const getKittys = (): Promise<AxiosResponse<Kitty[]>> => api.get('/images/search?limit=10');

export const addKittys = (
  data: { image_id: string; sub_id?: string }
): Promise<AxiosResponse<AddFavoriteResponse>> =>
  api.post<AddFavoriteResponse>('/favourites', data);

export const removeKittys = (
  favouriteId: number
): Promise<AxiosResponse<ApiResponse>> =>
  api.delete<ApiResponse>(`/favourites/${favouriteId}`);

export const getFavKittys = (): Promise<AxiosResponse<NormalizedFavorites>> =>
  api.get<FavoriteKitty[]>("/favourites?limit=10&sub_id=user123").then(res => {
    const kittys: Kitty[] = res.data.map(f => f.image);
    const favMap = new Map(res.data.map(f => [f.image.id, f.id]));

    return {
      ...res,
      data: { kittys, favMap },
    };
  });