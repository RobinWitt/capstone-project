import { useState } from "react";
import SVGIcon from "../Icons";
import {
  ListOfSpeakers,
  ItemOfSpeaker,
  StyledFoldButton,
} from "./Episode.styled";

export default function Speakers({ speakers }) {
  const [showListOfSpeakers, setShowListOfSpeakers] = useState(false);

  return (
    <>
      <StyledFoldButton
        type="button"
        onClick={() => setShowListOfSpeakers(!showListOfSpeakers)}
      >
        Stimmen
        <SVGIcon
          variant={showListOfSpeakers ? "chevronUp" : "chevronDown"}
          width="28px"
        />
      </StyledFoldButton>
      {showListOfSpeakers && (
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
      )}
    </>
  );
}
