import SVGIcon from "../Icons";
import { useRouter } from "next/router";
import { checkFavorites } from "@/components/Favoring/FavoringFunctions";
import { EpisodeHeader, EpisodeNavButton } from "./Episode.styled";

export default function EpisodeCardHeader({
  episodeNumber,
  onHideDetails,
  userData,
  reload,
}) {
  const router = useRouter();
  const isFaved = userData
    ? checkFavorites(userData.favorites, episodeNumber)
    : false;

  async function handleAddFavorite() {
    try {
      await fetch(`/api/favorites/${episodeNumber}`, {
        method: "PUT",
      });
    } catch (error) {
      console.error(error.message);
    }
    reload();
  }

  async function handleRemoveFavorite() {
    try {
      await fetch(`/api/favorites/${episodeNumber}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error.message);
    }
    reload();
  }

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
      {userData && (
        <EpisodeNavButton
          type="button"
          onClick={isFaved ? handleRemoveFavorite : handleAddFavorite}
          aria-label={`${
            isFaved ? "von Favoriten entfernen" : "zu Favoriten hinzufügen"
          }`}
        >
          <SVGIcon
            variant={isFaved ? "favoriteFilled" : "favoriteEmpty"}
            width="50px"
          />
        </EpisodeNavButton>
      )}
    </EpisodeHeader>
  );
}
