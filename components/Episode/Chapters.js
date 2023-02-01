import { useState } from "react";
import { ChaptersList, StyledFoldButton } from "./Episode.styled";

export default function Chapters({ chapters }) {
  const [showTracklist, setShowTracklist] = useState(false);

  return showTracklist ? (
    <>
      <StyledFoldButton
        type="button"
        onClick={() => setShowTracklist(!showTracklist)}
      >
        Kapitelliste schließen
      </StyledFoldButton>
      <ChaptersList>
        {chapters?.map(({ titel: title }) => {
          return <li key={title}>{title}</li>;
        })}
      </ChaptersList>
    </>
  ) : (
    <StyledFoldButton
      type="button"
      onClick={() => setShowTracklist(!showTracklist)}
    >
      Kapitelliste öffnen
    </StyledFoldButton>
  );
}
