import EpisodesList from "@/components/EpisodesList/EpisodesList";
import EpisodeListItem from "@/components/EpisodesList/EpisodeItem";
import { useAtom } from "jotai";
import useSWR from "swr";
import { initialFavorites } from "@/components/Favoring/initialFavorites";
import {
  checkFavorites,
  toggleFavorites,
} from "@/components/Favoring/FavoringFunctions";

export default function FavoritesPage() {
  const URL_ = "/api/episodes";
  const { data, isLoading, error } = useSWR(URL_);
  const [favorites, setFavorites] = useAtom(initialFavorites);

  if (error) return <div>error</div>;
  if (isLoading) return <div>loading...</div>;

  if (data) {
    return (
      <>
        <main>
          <h2>Favoriten</h2>
          <EpisodesList>
            {data.map(({ nummer: number, titel: title, teile: parts }) => {
              if (favorites.includes(number))
                return (
                  <EpisodeListItem
                    key={number}
                    episodeNumber={number}
                    title={title}
                    parts={parts}
                    href={`/episodes/${number}`}
                    onHandleFavorites={() => {
                      setFavorites(toggleFavorites(favorites, number));
                    }}
                    isFaved={checkFavorites(favorites, number)}
                  />
                );
            })}
          </EpisodesList>
        </main>
      </>
    );
  }
}
