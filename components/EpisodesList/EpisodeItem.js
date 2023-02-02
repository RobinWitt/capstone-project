import { useAtom } from "jotai";
import { getFormattedDate, getCoverURL } from "../Episode/EpisodeFunctions";
import { checkFavorites, toggleFavorites } from "../Favoring/FavoringFunctions";
import { initialFavorites } from "../Favoring/initialFavorites";
import SVGIcon from "../Icons";
import {
  ListButton,
  EpisodeLink,
  OverviewListItem,
  PreviewImage,
  OverviewText,
} from "./EpisodesList.styled";

export default function EpisodeListItem({ episode }) {
  const {
    nummer: number,
    titel: title,
    veröffentlichungsdatum: releasedate,
    teile: parts,
    links,
  } = episode;

  const [favorites, setFavorites] = useAtom(initialFavorites);
  const isFaved = checkFavorites(favorites, number);

  return (
    <OverviewListItem>
      <EpisodeLink href={`/episodes/${number}`}>
        <PreviewImage
          src={getCoverURL(links)}
          alt="bla"
          width={400}
          height={400}
        />
        <OverviewText>
          <p>
            {number} - {title}
          </p>
          <p></p>
          <p style={{ color: "grey" }}>{getFormattedDate(releasedate)}</p>
        </OverviewText>
      </EpisodeLink>
      <ListButton
        type="button"
        onClick={() => {
          setFavorites(toggleFavorites(favorites, number));
        }}
      >
        <SVGIcon
          variant={isFaved ? "favoriteFilled" : "favoriteEmpty"}
          width="35px"
        />
      </ListButton>
    </OverviewListItem>
  );
}
