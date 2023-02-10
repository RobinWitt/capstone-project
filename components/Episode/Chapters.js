import { useState } from "react";
import SVGIcon from "../Icons";
import { ChaptersList, StyledFoldButton } from "./Episode.styled";

export default function Chapters({ chapters }) {
  const [showTracklist, setShowTracklist] = useState(false);

  return (
    <>
      <StyledFoldButton
        type="button"
        onClick={() => setShowTracklist(!showTracklist)}
      >
        Kapitel
        <SVGIcon
          variant={showTracklist ? "chevronUp" : "chevronDown"}
          width="2rem"
        />
      </StyledFoldButton>
      {showTracklist && (
        <ChaptersList>
          {chapters?.map(({ titel: title }) => {
            return <li key={title}>{title}</li>;
          })}
        </ChaptersList>
      )}
    </>
  );
}
