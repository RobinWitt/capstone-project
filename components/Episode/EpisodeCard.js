import {
  EpisodeFacts,
  EpisodeImage,
  NoContentMessage,
  StyledEpisodeCard,
} from "./Episode.styled";
import EpisodeDescription from "./EpisodeDescription";
import { getCoverURL, getFormattedDate } from "./EpisodeFunctions";
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
  incomplete,
}) {
  return (
    <StyledEpisodeCard>
      {children}
      {coverlink ? (
        <EpisodeImage
          src={getCoverURL(coverlink)}
          alt={`Folge ${number}, Die Drei Fragezeichen ${title}`}
          width={400}
          height={400}
          priority
        />
      ) : (
        <NoContentMessage>kein Artwork vorhanden</NoContentMessage>
      )}
      {author ? (
        <EpisodeFacts>Autor*in: {author}</EpisodeFacts>
      ) : (
        <NoContentMessage>
          {parts ? "" : "kein*e Autor*in angegeben"}
        </NoContentMessage>
      )}
      {scriptauthor ? (
        <EpisodeFacts>Hörspielskript-Autor*in: {scriptauthor}</EpisodeFacts>
      ) : (
        <NoContentMessage>
          kein*e Hörspielskript-Autor*in angegeben
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
      {speakers?.length ? (
        <Speakers speakers={speakers} />
      ) : (
        <NoContentMessage>keine Stimmen angegeben</NoContentMessage>
      )}
      {chapters?.length ? (
        <Chapters chapters={chapters} />
      ) : (
        <NoContentMessage>
          {parts?.length ? "" : "keine Kapitelliste vorhanden"}
        </NoContentMessage>
      )}
      {parts?.length > 0 &&
        parts.map((part) => {
          return <Parts key={part.buchstabe} part={part} />;
        })}
      {incomplete && (
        <EpisodeFacts>diese Folge wird noch vervollständigt</EpisodeFacts>
      )}
    </StyledEpisodeCard>
  );
}
