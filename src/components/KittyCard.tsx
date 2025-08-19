import type { Kitty } from "@/types";
import { LikeButton } from "./LikeButton"

import styles from './KittyCard.module.css'

type KittyCardProps = {
  kitty: Kitty;
  isFavorite: boolean;
  handleFavoriteClick: (imageId: string) => void;
};

export const KittyCard = ({kitty, isFavorite, handleFavoriteClick}: KittyCardProps) => {
    return (
        <li className={styles.kitty} key={kitty.id}>
          <img className={styles.kittypic} src={kitty.url} />
          <LikeButton imageId={kitty.id} onClick={handleFavoriteClick} isFavorite={isFavorite} className={styles.button} iconClassName={styles.icon}/>
        </li>
    )
}