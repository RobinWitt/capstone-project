import SVGIcon from "../Icons";
import { useRouter } from "next/router";
import {
  checkFavorites,
  toggleFavorites,
} from "@/components/Favoring/FavoringFunctions";
import { EpisodeHeader, EpisodeNavButton } from "./Episode.styled";

export default function EpisodeCardHeader({ episodeNumber, onHideDetails }) {
  const router = useRouter();
  const isFaved = false;

  return (
    <EpisodeHeader>
      <EpisodeNavButton
        type="button"
        onClick={onHideDetails || router.back}
        aria-label="vorherige Seite"
      >
        <SVGIcon variant="returnIcon" width="50px" />
      </EpisodeNavButton>
      <h2>Folge {episodeNumber}</h2>
      <EpisodeNavButton
        type="button"
        onClick={() => {
          setFavorites(toggleFavorites(favorites, episodeNumber));
        }}
        aria-label={`${
          isFaved ? "von Favoriten entfernen" : "zu Favoriten hinzufügen"
        }`}
      >
        <SVGIcon
          variant={isFaved ? "favoriteFilled" : "favoriteEmpty"}
          width="50px"
        />
      </EpisodeNavButton>
    </EpisodeHeader>
  );
}
