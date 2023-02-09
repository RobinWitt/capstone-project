import useSWR from "swr";
import EpisodesList from "@/components/EpisodesList/EpisodesList";
import EpisodeListItem from "@/components/EpisodesList/EpisodeItem";
import { ListHeader } from "@/components/EpisodesList/EpisodesList.styled";

export default function FavoritesPage() {
  const { data, isLoading, error } = useSWR("/api/episodes");
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
    mutate,
  } = useSWR("/api/user");

  if (error || userError)
    return (
      <main>
        <ListHeader>Fehler beim Laden</ListHeader>
      </main>
    );
  if (isLoading || userIsLoading)
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
              .filter((episode) => userData.favorites.includes(episode.nummer))
              .map((episode) => {
                return (
                  <EpisodeListItem
                    key={episode.nummer}
                    episode={episode}
                    userData={userData}
                    reload={mutate}
                  />
                );
              })}
          </EpisodesList>
        </main>
      </>
    );
  }
}
