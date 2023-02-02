import EpisodesList from "@/components/EpisodesList/EpisodesList";
import EpisodeListItem from "@/components/EpisodesList/EpisodeItem";
import { useAtom } from "jotai";
import useSWR from "swr";
import { initialFavorites } from "@/components/Favoring/initialFavorites";
import {
  checkFavorites,
  toggleFavorites,
} from "@/components/Favoring/FavoringFunctions";
import { getMostRecent } from "@/components/Episode/EpisodeFunctions";

const URL = "/api/episodes";

export default function HomePage() {
  const { data, isLoading, error } = useSWR(URL);
  const [favorites, setFavorites] = useAtom(initialFavorites);

  if (error) return <div>error</div>;
  if (isLoading) return <div>loading...</div>;

  if (data) {
    const mostRecentEpisode = getMostRecent(data);
    const { nummer: number, titel: title, teile: parts } = mostRecentEpisode;

    return (
      <>
        <main>
          <h2>kürzlich erschienen</h2>
          <EpisodesList>
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
          </EpisodesList>
          <h2>Alle Folgen</h2>
          <EpisodesList>
            {data.map(({ nummer: number, titel: title, teile: parts }) => {
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
