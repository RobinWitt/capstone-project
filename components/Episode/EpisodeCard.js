import {
  EpisodeFacts,
  EpisodeImage,
  NoContentMessage,
  StyledEpisodeCard,
} from "./Episode.styled";
import EpisodeDescription from "./EpisodeDescription";
import { getFormattedDate } from "./EpisodeFunctions";
import Chapters from "./Chapters";
import Parts from "./Parts";
import Speakers from "./Speakers";

export default function EpisodeCard({
  children,
  number,
  title,
  coverlink,
  author,
  scriptauthor,
  releasedate,
  description,
  speakers,
  chapters,
  parts,
}) {
  return (
    <StyledEpisodeCard>
      {children}
      {coverlink ? (
        <EpisodeImage
          src={coverlink}
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
      {speakers?.length > 0 ? (
        <Speakers speakers={speakers} />
      ) : (
        <NoContentMessage>keine Stimmen angegeben</NoContentMessage>
      )}
      {chapters?.length > 0 ? (
        <Chapters chapters={chapters} />
      ) : (
        <NoContentMessage>
          {parts?.length > 0 ? "" : "keine Kapitelliste vorhanden"}
        </NoContentMessage>
      )}
      {parts?.length > 0
        ? parts.map((part) => {
            return <Parts key={part.buchstabe} part={part} />;
          })
        : ""}
    </StyledEpisodeCard>
  );
}
