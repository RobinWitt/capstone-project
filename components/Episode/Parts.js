import EpisodeDescription from "./EpisodeDescription";
import Chapters from "./Chapters";
import { EpisodeFacts, NoContentMessage, PartsHeader } from "./Episode.styled";

export default function Parts({ part }) {
  const {
    buchstabe: title,
    autor: author,
    beschreibung: description,
    kapitel: chapters,
  } = part;

  return (
    <>
      <PartsHeader>Part: {title}</PartsHeader>
      {author ? <EpisodeFacts>Autor: {author}</EpisodeFacts> : ""}
      {description ? (
        <EpisodeDescription description={description} />
      ) : (
        <NoContentMessage>keine Beschreibung vorhanden</NoContentMessage>
      )}
      {chapters ? (
        <Chapters chapters={chapters} />
      ) : (
        <NoContentMessage>keine Kapitelliste vorhanden</NoContentMessage>
      )}
    </>
  );
}
