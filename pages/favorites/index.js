import EpisodesList from "@/components/EpisodesList/EpisodesList";
import EpisodeListItem from "@/components/EpisodesList/EpisodeItem";
import { useAtom } from "jotai";
import useSWR from "swr";
import { initialFavorites } from "@/components/Favoring/initialFavorites";

const URL = "/api/episodes";

export default function FavoritesPage() {
  const { data, isLoading, error } = useSWR(URL);
  const [favorites] = useAtom(initialFavorites);

  if (error)
    return (
      <main>
        <h2>Fehler beim Laden</h2>
      </main>
    );
  if (isLoading)
    return (
      <main>
        <h2>wird geladen...</h2>
      </main>
    );

  if (data) {
    return (
      <>
        <main>
          <h2>Favoriten</h2>
          <EpisodesList>
            {data
              .filter((episode) => favorites.includes(episode.nummer))
              .map((episode) => {
                return (
                  <EpisodeListItem key={episode.nummer} episode={episode} />
                );
              })}
          </EpisodesList>
        </main>
      </>
    );
  }
}
