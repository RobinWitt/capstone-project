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
      <EpisodeLink
        href={`/episodes/${number}`}
        aria-label="Detailseite der Folge anzeigen"
      >
        <PreviewImage
          src={getCoverURL(links)}
          alt={`Cover Folge Nummer ${number}`}
          width={400}
          height={400}
        />
        <OverviewText>
          <p>
            {number} - {title}
          </p>
          <p style={{ color: "grey" }}>{getFormattedDate(releasedate)}</p>
        </OverviewText>
      </EpisodeLink>
      <ListButton
        type="button"
        onClick={() => {
          setFavorites(toggleFavorites(favorites, number));
        }}
        aria-label={`${
          isFaved ? "von Favoriten entfernen" : "zu Favoriten hinzufügen"
        }`}
      >
        <SVGIcon
          variant={isFaved ? "favoriteFilled" : "favoriteEmpty"}
          width="35px"
        />
      </ListButton>
    </OverviewListItem>
  );
}
