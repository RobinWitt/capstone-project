import EpisodesList from "@/components/EpisodesList/EpisodesList";
import EpisodeListItem from "@/components/EpisodesList/EpisodeItem";
import useSWR from "swr";
import {
  getMostRecentEpisode,
  isEpisodeReleased,
} from "@/components/Episode/EpisodeFunctions";
import RandomEpisode from "@/components/RandomEpisode/RandomEpisodeListItem";

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
          <h2>{isReleased ? "zuletzt erschienen" : "erscheint demnächst"}</h2>
          {mostRecentEpisode && (
            <>
              <EpisodesList>
                <EpisodeListItem episode={mostRecentEpisode} />
              </EpisodesList>
            </>
          )}
          <h2>zufällige Folge</h2>
          <RandomEpisode />
          <h2>Alle Folgen:</h2>
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
