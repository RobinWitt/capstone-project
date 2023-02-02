import EpisodesList from "@/components/EpisodesList/EpisodesList";
import EpisodeListItem from "@/components/EpisodesList/EpisodeItem";
import { useAtom } from "jotai";
import useSWR from "swr";
import { initialFavorites } from "@/components/Favoring/initialFavorites";

export default function FavoritesPage() {
  const URL_ = "/api/episodes";
  const { data, isLoading, error } = useSWR(URL_);
  const [favorites] = useAtom(initialFavorites);

  if (error) return <div>error</div>;
  if (isLoading) return <div>loading...</div>;

  if (data) {
    return (
      <>
        <main>
          <h2>Favoriten</h2>
          <EpisodesList>
            {data.map((episode) => {
              if (favorites.includes(episode.nummer))
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
