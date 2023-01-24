import { useState } from "react";
import styled from "styled-components";

const StyledFoldButton = styled.button`
  font-size: 1.2rem;
  margin-top: 0.8rem;
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
  );
}
