import type { FavorKitty, Kitty } from "@/types"
import { LikeButton } from "./LikeButton"

type KittyCardProps = {
    kittys: (Kitty | FavorKitty)[],
    favorites:Map<string,string>,
    handleFavoriteClick: (imageid:string) => void;
}

function isKitty(kitty: Kitty | FavorKitty): kitty is Kitty {
  return "url" in kitty;
}

export const KittyCard = ({kittys, favorites, handleFavoriteClick}:KittyCardProps) => {
    return (
        <ul className="kittys">
        {kittys.map(kitty => (
          <li className="kitty" key={kitty.id}>
            <img className="kittypic" src={isKitty(kitty) ? kitty.url : kitty.image.url} />
            <LikeButton imageId={kitty.id} onClick={handleFavoriteClick} favorites={favorites}/>
          </li>
        ))}
      </ul>
    )
}