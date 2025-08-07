import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { FavorKitty, Kitty} from '../types/index.ts';

if (!import.meta.env.VITE_API_KEY) {
  throw new Error('API key not found in environment variables');
}

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': API_KEY
  }
});
console.log(API_KEY);

export const getKittys = (): Promise<AxiosResponse<Kitty[]>> => 
  api.get('/images/search?limit=10');

export const addKittys = (
  data: {image_id:string; sub_id?: string}
): Promise<AxiosResponse> => 
  api.post('/favourites', data);

export const removeKittys = (
  favouriteId: string
): Promise<AxiosResponse> => 
  api.delete(`/favourites/${favouriteId}`);

export const getFavKittys = (): Promise<AxiosResponse<FavorKitty[]>> => 
  api.get('/favourites?limit=10&sub_id=user123');