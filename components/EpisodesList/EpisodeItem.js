import SVGIcon from "../Icons";
import {
  FavButton,
  StyledEpisodeLink,
  StyledListItem,
} from "./EpisodesList.styled";

export default function EpisodeListItem({
  episodeNumber,
  title,
  href,
  parts,
  onHandleFavorites,
  isFaved,
}) {
  return (
    <StyledListItem>
      <StyledEpisodeLink href={href}>
        <p>
          #{episodeNumber} ...{title}{" "}
          {parts?.length > 0 ? "(Spezialfolge)" : ""}
        </p>
      </StyledEpisodeLink>
      <FavButton type="button" onClick={onHandleFavorites}>
        <SVGIcon
          variant={isFaved ? "favoriteFilled" : "favoriteEmpty"}
          width="25px"
        />
      </FavButton>
    </StyledListItem>
  );
}
