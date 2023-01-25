import SVGIcon from "../Icons";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { initialFavorites } from "@/components/Favorites/initialFavorites";
import checkFavorites from "@/components/Favorites/favoriteCheck";

const DetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
`;

const EpisodeNavButton = styled.button`
  border: none;
  background: none;
`;

export default function EpisodeDetailsHeader({ episodeNumber }) {
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
    <DetailsHeader>
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
    </DetailsHeader>
  );
}
