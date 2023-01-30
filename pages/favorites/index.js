import EpisodesList from "@/components/EpisodesList/EpisodesList";
import EpisodeListItem from "@/components/EpisodesList/EpisodeItem";
import useSWR from "swr";
import { useAtom } from "jotai";
import { initialFavorites } from "@/components/Favoring/initialFavorites";
import checkFavorites from "@/components/Favoring/favoriteCheck";

const URL = "/serie.json";

export default function FavoritesPage() {
  const { data, error, isLoading } = useSWR(URL);
  const [favorites, setFavorites] = useAtom(initialFavorites);

  function handleFavorites(number) {
    const isFaved = checkFavorites(favorites, number);
    if (isFaved) {
      setFavorites(favorites.filter((favorite) => favorite != number));
    } else {
      setFavorites([...favorites, number]);
    }
  }

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  if (data) {
    const { serie } = data;

    return (
      <>
        <main>
          <h2>Favoriten</h2>
          <EpisodesList>
            {serie.map(({ nummer: number, titel: title, teile: parts }) => {
              if (favorites.includes(number))
                return (
                  <EpisodeListItem
                    key={number}
                    episodeNumber={number}
                    title={title}
                    parts={parts}
                    href={`/episodes/${number}`}
                    onHandleFavorites={() => {
                      handleFavorites(number);
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
