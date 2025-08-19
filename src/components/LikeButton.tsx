import OutlineHeartSVG from '../components/icons/OutlineHeart.svg?react';
import FilledHeartSVG from '../components/icons/FilledHeart.svg?react';


type LikeButtonProps = {
  isFavorite: boolean;
  onClick: (id: string) => void;
  imageId: string;
  className?: string;
  iconClassName?: string
};

export const LikeButton = ({ isFavorite, onClick, imageId, className, iconClassName }: LikeButtonProps) => {
  return (
    <button
      onClick={() => onClick(imageId)}
      className={className}
      title={isFavorite ? 'Добавлено в избранное' : 'Добавить в избранное'}
    >
      { isFavorite ? <FilledHeartSVG className={iconClassName}/> : <OutlineHeartSVG className={iconClassName} />}
    </button>
  );
};