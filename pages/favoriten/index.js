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

  if (error) return <ListHeader>Fehler beim Laden</ListHeader>;
  if (isLoading) return <ListHeader>wird geladen...</ListHeader>;
  if (userError)
    return <ListHeader>Nutzerdaten konnten nicht geladen werden.</ListHeader>;

  if (data) {
    return (
      <>
        <>
          <ListHeader>Favoriten</ListHeader>
          <EpisodesList>
            {data
              .filter(
                (episode) =>
                  userData && userData.favorites.includes(episode.nummer)
              )
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
        </>
      </>
    );
  }
}
