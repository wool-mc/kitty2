import type { Kitty } from '@/types';
import { KittyCard } from './KittyCard';

import styles from './KittyCardList.module.css'

type KittyCardListProps = {
  kittys: Kitty[];
  favorites: Map<string, string>;
  handleFavoriteClick: (imageid: string) => void;
};


export const KittyCardList = ({ kittys, favorites, handleFavoriteClick }: KittyCardListProps) => {
  return (
    <ul className={styles.kittys}>
      {kittys.map(kitty => (
        <KittyCard key={kitty.id} kitty={kitty} isFavorite={favorites.has(kitty.id)} handleFavoriteClick={handleFavoriteClick}/>
      ))}
    </ul>
  );
};