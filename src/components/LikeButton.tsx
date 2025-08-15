import  OutlineHeartSVG from "../components/icons/OutlineHeart.svg?react";
import  FilledHeartSVG from "../components/icons/FilledHeart.svg?react";

type LikeButtonProps = {
   favorites:Map<string,string>,
   onClick: (id:string) => void,
   imageId: string;
}

export const LikeButton = ({ favorites, onClick, imageId }: LikeButtonProps) => {
    const isFavorite = favorites.has(imageId);

    return (
        <button
              onClick={() => onClick(imageId)}
              className="favheart"
              title={isFavorite ? "Добавлено в избранное" : "Добавить в избранное"}
            >
              {isFavorite ? <FilledHeartSVG /> : <OutlineHeartSVG />}
        </button>
    )
}