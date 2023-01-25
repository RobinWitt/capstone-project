import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { ReturnIcon } from "../Icons/ReturnIcon";
import ChaptersBlock from "./ChaptersBlock";
import DescriptionBlock from "./DescriptionBlock";

const StyledArticle = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  margin: 1rem;
  padding: 1rem;
  border: 2px solid;
  border-radius: 10px;
`;

const StyledDetailsTitle = styled.h2`
  text-align: right;
  font-size: 2rem;
`;

const StyledReturnButton = styled.button`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  border: none;
  background: none;
  width: fit-content;
  height: fit-content;
  color: darkgreen;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  align-self: center;
  margin: 1rem;
`;

const StyledNoContentMessage = styled.p`
  margin-top: 0.8rem;
  color: lightgrey;
`;

export default function EpisodeDetails({ episode }) {
  const router = useRouter();
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
    <StyledArticle>
      <StyledReturnButton type="button" onClick={router.back}>
        <ReturnIcon />
      </StyledReturnButton>
      <StyledDetailsTitle>Folge {number}</StyledDetailsTitle>
      <StyledImage
        src={links.cover}
        alt={`Folge ${number}, Die Drei Fragezeichen ${title}`}
        width={500}
        height={500}
        priority
      />
      <p>Autor: {author}</p>
      <p>Hörspielskript-Autor: {scriptauthor}</p>
      <p>Veröffentlichungsdatum: {formattedReleaseDate}</p>
      {description ? (
        DescriptionBlock({ description })
      ) : (
        <StyledNoContentMessage>
          keine Beschreibung vorhanden
        </StyledNoContentMessage>
      )}
      {chapters ? (
        ChaptersBlock({ chapters })
      ) : (
        <StyledNoContentMessage>
          keine Kapitelliste vorhanden
        </StyledNoContentMessage>
      )}
    </StyledArticle>
  );
}
