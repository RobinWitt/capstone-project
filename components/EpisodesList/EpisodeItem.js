import { useEffect, useState } from "react";
import useSWR from "swr";
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
  const { data: favoritesData, mutate } = useSWR(`/api/favorites/${number}`);
  const [isFaved, setIsFaved] = useState();
  useEffect(() => {
    if (favoritesData) {
      setIsFaved(checkFavorites(favoritesData, number));
    }
  }, [favoritesData, number]);

  async function handleAddFavorite() {
    try {
      await fetch(`api/favorites/${number}`, {
        method: "PUT",
        body: number,
      });
    } catch (error) {
      console.error(error.message);
    }
    mutate();
  }

  async function handleRemoveFavorite() {
    try {
      await fetch(`api/favorites/${number}`, {
        method: "DELETE",
        body: number,
      });
    } catch (error) {
      console.error(error.message);
    }
    mutate();
  }

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
        onClick={isFaved ? handleRemoveFavorite : handleAddFavorite}
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
