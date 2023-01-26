import EpisodeDetailsHeader from "./EpisodeDetailsHeader";
import ChaptersBlock from "./ChaptersBlock";
import DescriptionBlock from "./DescriptionBlock";
import {
  EpisodeDetailsArticle,
  EpisodeImage,
  EpisodeFacts,
  NoContentMessage,
  Special,
} from "./EpisodeDetails.styled";
import PartDetails from "./PartDetails";

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
    teile: parts,
  } = episode;

  function getCoverURL() {
    if (links) {
      const { cover_kosmos, cover_itunes, cover } = links;
      if (cover_kosmos) {
        return cover_kosmos;
      } else if (cover_itunes) {
        return cover_itunes;
      } else if (cover) {
        return cover;
      } else {
        return false;
      }
    }
  }

  function getFormattedDate() {
    if (releasedate) {
      const splitDate = releasedate.split("-");
      const formattedReleaseDate =
        splitDate[2] + "." + splitDate[1] + "." + splitDate[0];
      return formattedReleaseDate;
    } else {
      return false;
    }
  }

  return (
    <EpisodeDetailsArticle>
      <EpisodeDetailsHeader episodeNumber={number} />
      {getCoverURL() ? (
        <EpisodeImage
          src={getCoverURL()}
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
        <NoContentMessage>kein Hörspielskript-Autor angegeben</NoContentMessage>
      )}
      {releasedate ? (
        <EpisodeFacts>
          Veröffentlichungsdatum: {getFormattedDate()}
        </EpisodeFacts>
      ) : (
        <NoContentMessage>
          kein Veröffentlichungsdatum angegeben
        </NoContentMessage>
      )}

      {description ? (
        DescriptionBlock({ description })
      ) : (
        <NoContentMessage>keine Beschreibung vorhanden</NoContentMessage>
      )}
      {chapters ? (
        ChaptersBlock({ chapters })
      ) : (
        <NoContentMessage>
          {parts ? "" : "keine Kapitelliste vorhanden"}
        </NoContentMessage>
      )}
      {parts
        ? parts.map((part) => {
            return <PartDetails key={part.buchstabe} part={part} />;
          })
        : ""}
    </EpisodeDetailsArticle>
  );
}
