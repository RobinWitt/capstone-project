import EpisodesList from "@/components/EpisodesList/EpisodesList";
import EpisodeListItem from "@/components/EpisodesList/EpisodeItem";
import useSWR from "swr";
import {
  getMostRecentEpisode,
  isEpisodeReleased,
} from "@/components/Episode/EpisodeFunctions";
import RandomEpisode from "@/components/RandomEpisode/RandomEpisodeListItem";
import { ListHeader } from "@/components/EpisodesList/EpisodesList.styled";

const URL = "/api/episodes";

export default function HomePage() {
  const { data, isLoading, error } = useSWR(URL);

  if (error) return <div>error</div>;
  if (isLoading) return <div>loading...</div>;

  if (data) {
    const mostRecentEpisode = getMostRecentEpisode(data);
    const isReleased = isEpisodeReleased(mostRecentEpisode);

    return (
      <>
        <main>
          <ListHeader>
            {isReleased ? "Zuletzt erschienen" : "Erscheint demnächst"}
          </ListHeader>
          {mostRecentEpisode && (
            <>
              <EpisodesList>
                <EpisodeListItem episode={mostRecentEpisode} />
              </EpisodesList>
            </>
          )}
          <ListHeader>Zufällige Folge</ListHeader>
          <RandomEpisode />
          <ListHeader>Alle Folgen</ListHeader>
          <EpisodesList>
            {data.map((episode) => {
              return <EpisodeListItem key={episode.nummer} episode={episode} />;
            })}
          </EpisodesList>
        </main>
      </>
    );
  }
}
