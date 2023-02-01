import { useState } from "react";
import { DescriptionText, StyledFoldButton } from "./Episode.styled";

export default function EpisodeDescription({ description }) {
  const [showDescription, setShowDescription] = useState(false);

  return showDescription ? (
    <>
      <StyledFoldButton
        type="button"
        onClick={() => setShowDescription(!showDescription)}
      >
        Beschreibung schließen
      </StyledFoldButton>
      <DescriptionText>{description}</DescriptionText>
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
