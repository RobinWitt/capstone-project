import { getFormattedDate, getCoverURL } from "../Episode/EpisodeFunctions";
import { checkFavorites, toggleFavorites } from "../Favoring/FavoringFunctions";
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

  const isFaved = false;

  return (
    <OverviewListItem>
      <EpisodeLink
        href={`/episoden/${number}`}
        aria-label="Detailseite der Folge anzeigen"
      >
        <PreviewImage
          src={getCoverURL(links)}
          alt={`Cover Folge Nummer ${number}`}
          width={100}
          height={100}
        />
        <OverviewText>
          <p>
            {number} - {title}
          </p>
          <p>{getFormattedDate(releasedate)}</p>
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
