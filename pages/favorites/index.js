import EpisodesList from "@/components/EpisodesList/EpisodesList";
import EpisodeListItem from "@/components/EpisodesList/EpisodeItem";
import { useAtom } from "jotai";
import { episodes } from "../_app";
import { initialFavorites } from "@/components/Favoring/initialFavorites";
import {
  checkFavorites,
  toggleFavorites,
} from "@/components/Favoring/FavoringFunctions";

export default function FavoritesPage() {
  const [allEpisodes] = useAtom(episodes);
  const [favorites, setFavorites] = useAtom(initialFavorites);

  return (
    <>
      <main>
        <h2>Favoriten</h2>
        <EpisodesList>
          {allEpisodes.map(({ nummer: number, titel: title, teile: parts }) => {
            if (favorites.includes(number))
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
