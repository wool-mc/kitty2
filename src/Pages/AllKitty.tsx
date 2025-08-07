import { useEffect, useState, type FC } from "react"
import type { Kitty } from "../types"
import { addKittys, getFavKittys, getKittys, removeKittys } from "../services/api";



const AllKitty: FC = () => {
    const [kittys, setKittys] = useState<Kitty[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
    const [favorites, setFavorites] = useState<string[]>([]);
    
    const handleFavoriteClick = async (imageId: string) => {
        try {
            if (!favorites.includes(imageId)) {
                await addKittys({ image_id: imageId, sub_id: "user123" });
                setFavorites((prev) => [...prev, imageId]);
            } else {
                await removeKittys(imageId);
                setFavorites((prev)=>prev.filter((e)=> e != imageId))
            }
        } catch (err) {
            console.error("Ошибка при добавлении в избранное", err);
        }
    };

    const OutlineHeartSVG = () => (
        <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
    );

    const FilledHeartSVG = () => (
        <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="red"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 21s-6.3-5.4-9.2-8.3a5.5 5.5 0 017.8-7.8l1.4 1.4 1.4-1.4a5.5 5.5 0 017.8 7.8C18.3 15.6 12 21 12 21z" />
        </svg>
    );

    useEffect(() => {
        const fetchKittys = async () => {
            try {
                setLoading(true);
                const response = await getKittys();
                const favResponse = await getFavKittys();

                setKittys(response.data || []);
                setFavorites(favResponse.data.map((fav: any) => fav.image_id));
            } catch(err) {
                setError(err instanceof Error ? err.message : 'Произошла ошибка');
            } finally {
                setLoading(false);
            }
        };
        
        fetchKittys();
    },[]);

    
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    
    return (
        <>
            <ul className="kittys">
                {kittys
                .map(kitty => (
                    <li className="kitty" key={kitty.id}>
                        <img className="kittypic" src={kitty.url} />
                        <button
                            onClick={()=>handleFavoriteClick(kitty.id)}
                            className="favheart"
                            title={favorites.includes(kitty.id) ? "Добавлено в избранное" : "Добавить в избранное"}
                        >
                            {favorites.includes(kitty.id) ? (<FilledHeartSVG />) : (<OutlineHeartSVG />)}
                        </button>
                    </li>
                ))
                } 
            </ul>
        </>
    )
}

export default AllKitty