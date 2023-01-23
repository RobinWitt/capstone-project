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

const StyledImage = styled(Image)`
  width: 90%;
  height: auto;
  align-self: center;
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
      <StyledImage
        src={links.cover}
        alt={`Folge ${nummer}, Die Drei Fragezeichen ${titel}`}
        width={500}
        height={500}
      />
      <p>Autor: {autor}</p>
      <p>Hörspielskript-Autor: {hörspielskriptautor}</p>
      <p>Veröffentlichungsdatum: {newDate}</p>
    </StyledArticle>
  );
}
