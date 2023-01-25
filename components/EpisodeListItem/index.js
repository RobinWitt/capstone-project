import Link from "next/link";
import styled from "styled-components";
import SVGIcon from "../Icons";
import { useAtom } from "jotai";
import { initialFavorites } from "@/components/Favorites/initialFavorites";
import checkFavorites from "@/components/Favorites/favoriteCheck";

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  background-color: lightgrey;
  margin: 0.5rem;
  border: 2px solid;
  border-radius: 5px;
`;

const StyledEpisodeLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 0.5rem;
  text-decoration: none;
  color: darkgreen;
`;

const FavButton = styled.button`
  border: none;
  border-left: 2px solid;
  padding: 0.5rem;
  background: none;
  color: darkgreen;
`;

export default function EpisodeListItem({ episodeNumber, title, href }) {
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
    <StyledListItem>
      <StyledEpisodeLink href={href}>
        <p>
          #{episodeNumber} ...{title}
        </p>
      </StyledEpisodeLink>
      <FavButton type="button" onClick={handleFavorites}>
        <SVGIcon
          variant={isFaved ? "favoriteFilled" : "favoriteEmpty"}
          width="25px"
        />
      </FavButton>
    </StyledListItem>
  );
}
