import EpisodesList from "@/components/EpisodesList/EpisodesList";
import EpisodeListItem from "@/components/EpisodesList/EpisodeItem";
import { useAtom } from "jotai";
import useSWR from "swr";
import { initialFavorites } from "@/components/Favoring/initialFavorites";
import {
  checkFavorites,
  toggleFavorites,
} from "@/components/Favoring/FavoringFunctions";
import {
  getCoverURL,
  getMostRecent,
  isEpisodeReleased,
} from "@/components/Episode/EpisodeFunctions";

const URL = "/api/episodes";

export default function HomePage() {
  const { data, isLoading, error } = useSWR(URL);
  const [favorites, setFavorites] = useAtom(initialFavorites);

  if (error) return <div>error</div>;
  if (isLoading) return <div>loading...</div>;

  if (data) {
    const mostRecentEpisode = getMostRecent(data);
    const isReleased = isEpisodeReleased(mostRecentEpisode);
    const {
      nummer: number,
      titel: title,
      veröffentlichungsdatum: releasedate,
      teile: parts,
      links,
    } = mostRecentEpisode;

    return (
      <>
        <main>
          <h2>
            {isReleased ? "kürzlich erschienen:" : "erscheint demnächst:"}
          </h2>
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
              cover={getCoverURL(links)}
              releasedate={releasedate}
            />
          </EpisodesList>
          <h2>zufällige Folge:</h2>

          <h2>Alle Folgen:</h2>
          <EpisodesList>
            {data.map(
              ({
                nummer: number,
                titel: title,
                veröffentlichungsdatum: releasedate,
                teile: parts,
                links,
              }) => {
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
                    cover={getCoverURL(links)}
                    releasedate={releasedate}
                  />
                );
              }
            )}
          </EpisodesList>
        </main>
      </>
    );
  }
}
