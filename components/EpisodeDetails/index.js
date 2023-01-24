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
  color: lightgrey;
`;

export default function EpisodeDetails({ episode }) {
  const [showDescription, setShowDescription] = useState(false);
  const [showTracklist, setShowTracklist] = useState(false);

  const router = useRouter();
  const {
    nummer,
    titel,
    autor,
    hörspielskriptautor,
    beschreibung,
    veröffentlichungsdatum,
    kapitel,
    links,
  } = episode;

  const splitDate = veröffentlichungsdatum.split("-");
  const newDate = splitDate[2] + "." + splitDate[1] + "." + splitDate[0];

  return (
    <StyledArticle>
      <StyledReturnButton type="button" onClick={() => router.back()}>
        <ReturnIcon />
      </StyledReturnButton>
      <StyledDetailsTitle>Folge {nummer}</StyledDetailsTitle>
      <StyledImage
        src={links.cover}
        alt={`Folge ${nummer}, Die Drei Fragezeichen ${titel}`}
        width={500}
        height={500}
      />
      <p>Autor: {autor}</p>
      <p>Hörspielskript-Autor: {hörspielskriptautor}</p>
      <p>Veröffentlichungsdatum: {newDate}</p>
      {beschreibung ? (
        showDescription === true ? (
          <>
            <StyledFoldButton
              type="button"
              onClick={() => setShowDescription(!showDescription)}
            >
              Beschreibung schließen
            </StyledFoldButton>
            <p>{beschreibung}</p>
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
      {kapitel ? (
        showTracklist === true ? (
          <>
            <StyledFoldButton
              type="button"
              onClick={() => setShowTracklist(!showTracklist)}
            >
              Kapitelliste schließen
            </StyledFoldButton>
            <p>
              {kapitel?.map(({ titel }, index) => {
                return (
                  <p key={titel}>
                    {index + 1} - {titel}
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
