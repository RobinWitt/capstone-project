import Image from "next/image";
import styled from "styled-components";

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  margin: 1rem;
  padding: 1rem;
  border: 2px solid;
  border-radius: 10px;
`;

export default function EpisodeDetails({ episode }) {
  // destructure episode
  const {
    nummer,
    titel,
    autor,
    hörspielskriptautor,
    veröffentlichungsdatum,
    links,
  } = episode;

  //refactor release date string
  const splitDate = veröffentlichungsdatum.split("-");
  const newDate = splitDate[2] + "." + splitDate[1] + "." + splitDate[0];

  return (
    <StyledArticle>
      <h2>Folge {nummer}</h2>
      <Image
        src={links.cover}
        alt={`Folge ${nummer}, Die Drei Fragezeichen ${titel}`}
        width={400}
        height={400}
      />
      <p>Autor: {autor}</p>
      <p>Hörspielskript-Autor: {hörspielskriptautor}</p>
      <p>Veröffentlichungsdatum: {newDate}</p>
    </StyledArticle>
  );
}
