import EpisodeCard from "@/components/Episode/EpisodeCard";
import Chapters from "@/components/Episode/Chapters";
import EpisodeDescription from "@/components/Episode/EpisodeDescription";
import {
  EpisodeFacts,
  EpisodeImage,
  NoContentMessage,
} from "@/components/Episode/Episode.styled";
import EpisodeCardHeader from "@/components/Episode/EpisodeCardHeader";
import {
  getCoverURL,
  getFormattedDate,
} from "@/components/Episode/EpisodeFunctions";
import Parts from "@/components/Episode/Parts";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { episodes } from "../_app";

export default function EpisodePage() {
  const [allEpisodes] = useAtom(episodes);

  const router = useRouter();
  const { currentEpisode } = router.query;

  const [filteredEpisode] = allEpisodes.filter(
    (episode) => episode.nummer === parseInt(currentEpisode)
  );

  if (!filteredEpisode) {
    return (
      <main>
        <h2>Diese Folge scheint es nicht zu geben.</h2>
      </main>
    );
  }

  const {
    nummer: number,
    titel: title,
    autor: author,
    hörspielskriptautor: scriptauthor,
    beschreibung: description,
    veröffentlichungsdatum: releasedate,
    kapitel: chapters,
    links,
    teile: parts,
  } = filteredEpisode;

  return (
    <main>
      <EpisodeCard>
        <EpisodeCardHeader episodeNumber={number} />
        {getCoverURL(links) ? (
          <EpisodeImage
            src={getCoverURL(links)}
            alt={`Folge ${number}, Die Drei Fragezeichen ${title}`}
            width={500}
            height={500}
            priority
          />
        ) : (
          <NoContentMessage>kein Artwork vorhanden</NoContentMessage>
        )}
        {author ? (
          <EpisodeFacts>Autor: {author}</EpisodeFacts>
        ) : (
          <NoContentMessage>
            {parts ? "" : "kein Autor angegeben"}
          </NoContentMessage>
        )}
        {scriptauthor ? (
          <EpisodeFacts>Hörspielskript-Autor: {scriptauthor}</EpisodeFacts>
        ) : (
          <NoContentMessage>
            kein Hörspielskript-Autor angegeben
          </NoContentMessage>
        )}
        {releasedate ? (
          <EpisodeFacts>
            Veröffentlichungsdatum: {getFormattedDate(releasedate)}
          </EpisodeFacts>
        ) : (
          <NoContentMessage>
            kein Veröffentlichungsdatum angegeben
          </NoContentMessage>
        )}
        {description ? (
          <EpisodeDescription description={description} />
        ) : (
          <NoContentMessage>keine Beschreibung vorhanden</NoContentMessage>
        )}
        {chapters ? (
          <Chapters chapters={chapters} />
        ) : (
          <NoContentMessage>
            {parts ? "" : "keine Kapitelliste vorhanden"}
          </NoContentMessage>
        )}
        {parts
          ? parts.map((part) => {
              return <Parts key={part.buchstabe} part={part} />;
            })
          : ""}
      </EpisodeCard>
    </main>
  );
}
