import { useEffect, useState } from 'react';
import type { Kitty } from '../types';
import { addKittys, getFavKittys, getKittys, removeKittys } from '../services/api';
import { getErrorMessage } from '../utility/getErrorMessage';
import { KittyCardList } from '../components/KittyCardList';
import { useLocation } from 'react-router-dom';

export const Kittys = () => {
  const [kittys, setKittys] = useState<Kitty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Map<string, number>>(new Map());

  const {pathname} = useLocation()
  const isHomePage = pathname === '/'

  const handleFavoriteClick = async (imageId: string) => {
    try {
      if (!favorites.has(imageId)) {
        const res = await addKittys({ image_id: imageId, sub_id: 'user123' });
        const favId = res.data.id;
        setFavorites(prev => new Map(prev).set(imageId, favId));
      } else {
        const favId = favorites.get(imageId);
        if (!favId) {
          console.error('favId отсутсвует');
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

        const favResponse = await getFavKittys();

        if (isHomePage) {
          const response = await getKittys();
          setKittys(response.data || []);
        } else {
          setKittys(favResponse.data.kittys || []);
        }


        setFavorites(favResponse.data.favMap)
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchKittys();
  }, [pathname]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <>
      <KittyCardList kittys={kittys} favorites={favorites} handleFavoriteClick={handleFavoriteClick} />
    </>
  );
};