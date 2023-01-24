import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { ReturnIcon } from "../Icons/ReturnIcon";

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
  const [showDescription, setShowDescription] = useState(false);
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
      <button type="button" onClick={() => router.back()}>
        <ReturnIcon />
      </button>
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
      {showDescription === true ? (
        <>
          <button
            type="button"
            onClick={() => setShowDescription(!showDescription)}
          >
            Beschreibung schließen
          </button>
          <p>{beschreibung}</p>
        </>
      ) : (
        <button
          type="button"
          onClick={() => setShowDescription(!showDescription)}
        >
          Beschreibung öffnen
        </button>
      )}
      {kapitel?.map(({ titel }, index) => {
        return (
          <p key={titel}>
            {index + 1} - {titel}
          </p>
        );
      })}
    </StyledArticle>
  );
}
