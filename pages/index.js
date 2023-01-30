import EpisodesList from "@/components/EpisodesList/EpisodesList";
import EpisodeListItem from "@/components/EpisodesList/EpisodeItem";
import { useAtom } from "jotai";
import { episodes } from "./_app";
import { initialFavorites } from "@/components/Favoring/initialFavorites";
import {
  checkFavorites,
  handleFavorites,
} from "@/components/Favoring/FavoringFunctions";

export default function HomePage() {
  const [favorites, setFavorites] = useAtom(initialFavorites);
  const [allEpisodes] = useAtom(episodes);

  return (
    <>
      <main>
        <h2>Alle Folgen</h2>
        <EpisodesList>
          {allEpisodes.map(({ nummer: number, titel: title, teile: parts }) => {
            return (
              <EpisodeListItem
                key={number}
                episodeNumber={number}
                title={title}
                parts={parts}
                href={`/episodes/${number}`}
                onHandleFavorites={() => {
                  setFavorites(handleFavorites(favorites, number));
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
