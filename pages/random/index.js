import { useState } from "react";
import useSWR from "swr";
import EpisodeCard from "@/components/Episode/EpisodeCard";
import EpisodeCardHeader from "@/components/Episode/EpisodeCardHeader";
import {
  getRandomIntInclusive,
  isEpisodeReleased,
} from "@/components/Episode/EpisodeFunctions";
import { ListHeader } from "@/components/EpisodesList/EpisodesList.styled";
import RandomCard from "@/components/RandomEpisode/RandomCard";

export default function RandomPage() {
  const [random, setRandom] = useState(getRandomIntInclusive(0, 200));
  const [toggleDetails, setToggleDetails] = useState(false);
  const { data, isLoading, error } = useSWR(`api/episodes/${random}`);
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
    mutate,
  } = useSWR("/api/user");

  function handleSetRandom() {
    setRandom(getRandomIntInclusive(1, 200));
  }

  function handleShowDetails() {
    setToggleDetails(true);
  }

  function handleHideDetails() {
    setToggleDetails(false);
  }

  if (error)
    return (
      <main>
        <ListHeader>Fehler beim Laden</ListHeader>
      </main>
    );
  if (isLoading)
    return (
      <main>
        <ListHeader>wird geladen...</ListHeader>
      </main>
    );

  if (data) {
    const {
      nummer: number,
      titel: title,
      autor: author,
      hörspielskriptautor: scriptauthor,
      beschreibung: description,
      veröffentlichungsdatum: releasedate,
      sprecher: speakers,
      kapitel: chapters,
      links,
      teile: parts,
      unvollständig: incomplete,
    } = data;

    const isReleased = isEpisodeReleased(data);

    return (
      <main>
        {toggleDetails ? (
          <EpisodeCard
            number={number}
            title={title}
            coverlink={links}
            author={author}
            scriptauthor={scriptauthor}
            releasedate={releasedate}
            description={description}
            chapters={chapters}
            speakers={speakers}
            parts={parts}
            incomplete={incomplete}
            isReleased={isReleased}
          >
            <EpisodeCardHeader
              episodeNumber={number}
              onHideDetails={handleHideDetails}
              userData={userData}
              reload={mutate}
            />
          </EpisodeCard>
        ) : (
          random && (
            <RandomCard
              coverlink={links}
              onSetRandom={handleSetRandom}
              onShowDetails={handleShowDetails}
            />
          )
        )}
      </main>
    );
  }
}
