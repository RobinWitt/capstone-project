import DescriptionBlock from "./DescriptionBlock";
import ChaptersBlock from "./ChaptersBlock";
import {
  EpisodeFacts,
  NoContentMessage,
  Special,
} from "./EpisodeDetails.styled";

export default function PartDetails({ part }) {
  const {
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
