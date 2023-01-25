import { useState } from "react";
import styled from "styled-components";

const StyledFoldButton = styled.button`
  font-size: 1.2rem;
  margin-top: 0.8rem;
  color: darkgreen;
`;

const StyledChaptersList = styled.ol`
  list-style: decimal;
  margin: 0.5rem;
  margin-left: 1.5rem;
`;

export default function ChaptersBlock({ chapters }) {
  const [showTracklist, setShowTracklist] = useState(false);

  return showTracklist === true ? (
    <>
      <StyledFoldButton
        type="button"
        onClick={() => setShowTracklist(!showTracklist)}
      >
        Kapitelliste schließen
      </StyledFoldButton>
      <StyledChaptersList>
        {chapters?.map(({ titel: title }) => {
          return <li key={title}>{title}</li>;
        })}
      </StyledChaptersList>
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
