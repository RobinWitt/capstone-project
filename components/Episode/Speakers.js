import { useState } from "react";
import {
  ListOfSpeakers,
  ItemOfSpeaker,
  StyledFoldButton,
} from "./Episode.styled";

export default function Speakers({ speakers }) {
  const [showListOfSpeakers, setShowListOfSpeakers] = useState(false);

  return showListOfSpeakers ? (
    <>
      <StyledFoldButton
        type="button"
        onClick={() => setShowListOfSpeakers(!showListOfSpeakers)}
      >
        Stimmenliste schließen
      </StyledFoldButton>
      <ListOfSpeakers>
        {speakers?.map((speaker, index) => {
          return (
            <ItemOfSpeaker key={index}>
              {speaker[0]}:<br />
              {speaker[1]}
            </ItemOfSpeaker>
          );
        })}
      </ListOfSpeakers>
    </>
  ) : (
    <StyledFoldButton
      type="button"
      onClick={() => setShowListOfSpeakers(!showListOfSpeakers)}
    >
      Stimmenliste öffnen
    </StyledFoldButton>
  );
}
