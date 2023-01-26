import EpisodeDetailsHeader from "./EpisodeDetailsHeader";
import ChaptersBlock from "./ChaptersBlock";
import DescriptionBlock from "./DescriptionBlock";
import {
  EpisodeDetailsArticle,
  EpisodeFacts,
  NoContentMessage,
  Special,
} from "./EpisodeDetails.styled";

export default function PartDetails({ part }) {
  const {
    teilNummer: number,
    buchstabe: title,
    autor: author,
    beschreibung: description,
    kapitel: chapters,
  } = part;

  return (
    <>
      <Special>Part: {title}</Special>
      {author ? <EpisodeFacts>Autor: {author}</EpisodeFacts> : ""}
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
    </>
  );
}
