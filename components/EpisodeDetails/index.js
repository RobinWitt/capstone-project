import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { ReturnIcon } from "../Icons/ReturnIcon";

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
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  align-self: center;
  margin: 1rem;
`;

const StyledFoldButton = styled.button`
  font-size: 1.2rem;
  margin-top: 0.8rem;
`;

const StyledNoContentMessage = styled.p`
  margin-top: 0.8rem;
  color: lightgrey;
`;

export default function EpisodeDetails({ episode }) {
  const [showDescription, setShowDescription] = useState(false);
  const [showTracklist, setShowTracklist] = useState(false);

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
      <StyledReturnButton type="button" onClick={() => router.back()}>
        <ReturnIcon />
      </StyledReturnButton>
      <StyledDetailsTitle>Folge {number}</StyledDetailsTitle>
      <StyledImage
        src={links.cover}
        alt={`Folge ${number}, Die Drei Fragezeichen ${title}`}
        width={500}
        height={500}
      />
      <p>Autor: {author}</p>
      <p>Hörspielskript-Autor: {scriptauthor}</p>
      <p>Veröffentlichungsdatum: {formattedReleaseDate}</p>
      {description ? (
        showDescription === true ? (
          <>
            <StyledFoldButton
              type="button"
              onClick={() => setShowDescription(!showDescription)}
            >
              Beschreibung schließen
            </StyledFoldButton>
            <p>{description}</p>
          </>
        ) : (
          <StyledFoldButton
            type="button"
            onClick={() => setShowDescription(!showDescription)}
          >
            Beschreibung öffnen
          </StyledFoldButton>
        )
      ) : (
        <StyledNoContentMessage>
          keine Beschreibung vorhanden
        </StyledNoContentMessage>
      )}
      {chapters ? (
        showTracklist === true ? (
          <>
            <StyledFoldButton
              type="button"
              onClick={() => setShowTracklist(!showTracklist)}
            >
              Kapitelliste schließen
            </StyledFoldButton>
            <p>
              {chapters?.map(({ titel: title }, index) => {
                return (
                  <p key={title}>
                    {index + 1} - {title}
                  </p>
                );
              })}
            </p>
          </>
        ) : (
          <StyledFoldButton
            type="button"
            onClick={() => setShowTracklist(!showTracklist)}
          >
            Kapitelliste öffnen
          </StyledFoldButton>
        )
      ) : (
        <StyledNoContentMessage>
          keine Kapitelliste vorhanden
        </StyledNoContentMessage>
      )}
    </StyledArticle>
  );
}
