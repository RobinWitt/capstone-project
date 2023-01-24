import { useState } from "react";
import styled from "styled-components";

const StyledFoldButton = styled.button`
  font-size: 1.2rem;
  margin-top: 0.8rem;
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
      <p>{description}</p>
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
