import EpisodeCard from "@/components/Episode/EpisodeCard";
import EpisodeCardHeader from "@/components/Episode/EpisodeCardHeader";
import { getRandomIntInclusive } from "@/components/Episode/EpisodeFunctions";
import RandomCard from "@/components/RandomEpisode/RandomCard";
import RandomCardHeader from "@/components/RandomEpisode/RandomCardHeader";
import { useState } from "react";
import useSWR from "swr";

export default function RandomPage() {
  const [random, setRandom] = useState(getRandomIntInclusive(0, 200));
  const [toggleDetails, setToggleDetails] = useState(false);
  const { data, isLoading, error } = useSWR(`api/episodes/${random}`);

  function handleSetRandom() {
    setRandom(getRandomIntInclusive(1, 200));
  }

  function handleShowDetails() {
    setToggleDetails(true);
  }

  function handleHideDetails() {
    setToggleDetails(false);
  }

  if (error) return <div>Folge nicht gefunden</div>;
  if (isLoading) return <div>wird geladen...</div>;

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
          >
            <EpisodeCardHeader
              episodeNumber={number}
              onHideDetails={handleHideDetails}
            />
          </EpisodeCard>
        ) : (
          random && (
            <RandomCard coverlink={links}>
              <RandomCardHeader
                onSetRandom={handleSetRandom}
                onShowDetails={handleShowDetails}
                episodeNumber={number}
              />
            </RandomCard>
          )
        )}
      </main>
    );
  }
}
