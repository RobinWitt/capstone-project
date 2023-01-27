import EpisodeList from "@/components/EpisodeList";
import EpisodeListItem from "@/components/EpisodeListItem";
import useSWR from "swr";
import { useAtom } from "jotai";
import { initialFavorites } from "@/components/Favorites/initialFavorites";

const URL = "/serie.json";

export default function FavoritesPage() {
  const { data, error, isLoading } = useSWR(URL);
  const [favorites, setFavorites] = useAtom(initialFavorites);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  if (data) {
    const { serie } = data;

    return (
      <>
        <main>
          <h2>Favoriten</h2>
          <EpisodeList>
            {serie.map(({ nummer: number, titel: title, teile: parts }) => {
              if (favorites.includes(number))
                return (
                  <EpisodeListItem
                    key={number}
                    episodeNumber={number}
                    title={title}
                    parts={parts}
                    href={`/episodes/${number}`}
                  />
                );
            })}
          </EpisodeList>
        </main>
      </>
    );
  }
}
