import EpisodesList from "@/components/EpisodesList/EpisodesList";
import EpisodeListItem from "@/components/EpisodesList/EpisodeItem";
import { useAtom } from "jotai";
import useSWR from "swr";
import { initialFavorites } from "@/components/Favoring/initialFavorites";
import { ListHeader } from "@/components/EpisodesList/EpisodesList.styled";

const URL = "/api/episodes";

export default function FavoritesPage() {
  const { data, isLoading, error } = useSWR(URL);
  const [favorites] = useAtom(initialFavorites);

  if (error)
    return (
      <main>
        <ListHeader>Fehler beim Laden</ListHeader>
      </main>
    );
  if (isLoading)
    return (
      <main>
        <ListHeader>wird geladen...</ListHeader>
      </main>
    );

  if (data) {
    return (
      <>
        <main>
          <ListHeader>Favoriten</ListHeader>
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
