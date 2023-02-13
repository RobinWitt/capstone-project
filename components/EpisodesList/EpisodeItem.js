import { useEffect, useState } from "react";
import useSWR from "swr";
import { getFormattedDate, getCoverURL } from "../Episode/EpisodeFunctions";
import { checkFavorites } from "../Favoring/FavoringFunctions";
import SVGIcon from "../Icons";
import {
  ListButton,
  EpisodeLink,
  OverviewListItem,
  PreviewImage,
  OverviewText,
  ListEpisodeDate,
} from "./EpisodesList.styled";

export default function EpisodeListItem({ episode, userData, reload }) {
  const {
    nummer: number,
    titel: title,
    veröffentlichungsdatum: releasedate,
    teile: parts,
    links,
  } = episode;

  const isFaved = userData ? checkFavorites(userData.favorites, number) : false;

  async function handleAddFavorite() {
    try {
      await fetch(`/api/favorites/${number}`, {
        method: "PUT",
      });
    } catch (error) {
      console.error(error.message);
    }
    reload();
  }

  async function handleRemoveFavorite() {
    try {
      await fetch(`/api/favorites/${number}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error.message);
    }
    reload();
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
          <ListEpisodeDate>{getFormattedDate(releasedate)}</ListEpisodeDate>
        </OverviewText>
      </EpisodeLink>
      {userData && (
        <ListButton
          type="button"
          onClick={isFaved ? handleRemoveFavorite : handleAddFavorite}
          aria-label={`${
            isFaved ? "von Favoriten entfernen" : "zu Favoriten hinzufügen"
          }`}
        >
          <SVGIcon
            variant={isFaved ? "favoriteFilled" : "favoriteEmpty"}
            width="30px"
          />
        </ListButton>
      )}
    </OverviewListItem>
  );
}
