import EpisodeDetailsHeader from "./EpisodeDetailsHeader";
import ChaptersBlock from "./ChaptersBlock";
import DescriptionBlock from "./DescriptionBlock";
import {
  EpisodeDetailsArticle,
  EpisodeImage,
  EpisodeFacts,
  NoContentMessage,
} from "./EpisodeDetails.styled";

export default function EpisodeDetails({ episode }) {
  const {
    nummer: number,
    titel: title,
    autor: author,
    hörspielskriptautor: scriptauthor,
    beschreibung: description,
    veröffentlichungsdatum: releasedate,
    kapitel: chapters,
    links,
  } = episode;

  const splitDate = releasedate.split("-");
  const formattedReleaseDate =
    splitDate[2] + "." + splitDate[1] + "." + splitDate[0];

  return (
    <EpisodeDetailsArticle>
      <EpisodeDetailsHeader episodeNumber={number} />
      <EpisodeImage
        src={links.cover_kosmos}
        alt={`Folge ${number}, Die Drei Fragezeichen ${title}`}
        width={500}
        height={500}
        priority
      />
      <EpisodeFacts>Autor: {author}</EpisodeFacts>
      <EpisodeFacts>Hörspielskript-Autor: {scriptauthor}</EpisodeFacts>
      <EpisodeFacts>
        Veröffentlichungsdatum: {formattedReleaseDate}
      </EpisodeFacts>
      {description ? (
        DescriptionBlock({ description })
      ) : (
        <NoContentMessage>keine Beschreibung vorhanden</NoContentMessage>
      )}
      {chapters ? (
        ChaptersBlock({ chapters })
      ) : (
        <NoContentMessage>keine Kapitelliste vorhanden</NoContentMessage>
      )}
    </EpisodeDetailsArticle>
  );
}
