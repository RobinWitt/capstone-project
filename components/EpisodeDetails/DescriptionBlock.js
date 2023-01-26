import { useState } from "react";
import styled from "styled-components";

const StyledFoldButton = styled.button`
  font-size: 1.2rem;
  margin-top: 0.8rem;
  color: darkgreen;
`;

const StyledDescriptionText = styled.p`
  margin: 0.5rem;
`;

export default function DescriptionBlock({ description }) {
  const [showDescription, setShowDescription] = useState(false);

  return showDescription === true ? (
    <>
      <StyledFoldButton
        type="button"
        onClick={() => setShowDescription(!showDescription)}
      >
        Beschreibung schließen
      </StyledFoldButton>
      <StyledDescriptionText>{description}</StyledDescriptionText>
    </>
  ) : (
    <StyledFoldButton
      type="button"
      onClick={() => setShowDescription(!showDescription)}
    >
      Beschreibung öffnen
    </StyledFoldButton>
  );
}
