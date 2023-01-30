import EpisodesList from "@/components/EpisodesList/EpisodesList";
import EpisodeListItem from "@/components/EpisodesList/EpisodeItem";
import useSWR from "swr";
import { useAtom } from "jotai";
import { initialFavorites } from "@/components/Favoring/initialFavorites";
import {
  checkFavorites,
  handleFavorites,
} from "@/components/Favoring/favoriteCheck";

const URL = "/serie.json";
const URL_ = "/api/episodes";

export default function HomePage() {
  const { data, isLoading, error } = useSWR(URL_);
  const [favorites, setFavorites] = useAtom(initialFavorites);

  // function handleFavorites(number) {
  //   const isFaved = checkFavorites(favorites, number);
  //   if (isFaved) {
  //     setFavorites(favorites.filter((favorite) => favorite != number));
  //   } else {
  //     setFavorites([...favorites, number]);
  //   }
  // }

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  if (data) {
    return (
      <>
        <main>
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
}
