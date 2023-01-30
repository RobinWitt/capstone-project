import SVGIcon from "../Icons";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { initialFavorites } from "@/components/Favoring/initialFavorites";
import { checkFavorites } from "@/components/Favoring/favoriteCheck";
import { EpisodeHeader, EpisodeNavButton } from "./Episode.styled";

export default function EpisodeCardHeader({ episodeNumber }) {
  const router = useRouter();
  const [favorites, setFavorites] = useAtom(initialFavorites);
  const isFaved = checkFavorites(favorites, episodeNumber);

  function handleFavorites() {
    if (isFaved) {
      setFavorites(favorites.filter((favorite) => favorite != episodeNumber));
    } else {
      setFavorites([...favorites, episodeNumber]);
    }
  }

  return (
    <EpisodeHeader>
      <EpisodeNavButton type="button" onClick={router.back}>
        <SVGIcon variant="returnIcon" width="50px" color="darkgreen" />
      </EpisodeNavButton>
      <h2>Folge {episodeNumber}</h2>
      <EpisodeNavButton type="button" onClick={handleFavorites}>
        <SVGIcon
          variant={isFaved ? "favoriteFilled" : "favoriteEmpty"}
          width="50px"
          color="darkgreen"
        />
      </EpisodeNavButton>
    </EpisodeHeader>
  );
}
