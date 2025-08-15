import { useEffect, useState } from 'react';
import type { FavorKitty, Kitty } from '../types';
import { addKittys, getFavKittys, getKittys, removeKittys } from '../services/api';
import { getErrorMessage } from '../utility/getErrorMessage';
import { KittyCard } from '../components/KittyCard';


const AllKitty = () => {
  const [kittys, setKittys] = useState<Kitty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Map<string,string>>(new Map());

  const handleFavoriteClick = async (imageId: string) => {
  try {
    if (!favorites.has(imageId)) {
      const res = await addKittys({ image_id: imageId, sub_id: 'user123' });
      const favId = res.data.id;
      setFavorites(prev => new Map(prev).set(imageId, favId));
    } else {
      const favId = favorites.get(imageId);
      if (!favId) {
        console.error('favId отсутсвует')
        return;
      }
      await removeKittys(favId);
      setFavorites(prev => {
        const updated = new Map(prev);
        updated.delete(imageId);
        return updated;
      });
    }
  } catch (err) {
    console.error('Ошибка при добавлении/удалении из избранного', err);
  }
};


  useEffect(() => {
    const fetchKittys = async () => {
      try {
        setLoading(true);
        const response = await getKittys();
        const favResponse = await getFavKittys();

        setKittys(response.data || []);
        
        const favMap = new Map(
          (favResponse.data as FavorKitty[]).map(fav=>[fav.image.id, fav.id])
        );
        setFavorites(favMap);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchKittys();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <>
      <KittyCard kittys={kittys} favorites={favorites} handleFavoriteClick={handleFavoriteClick} />
    </>
  );
};

export default AllKitty;
