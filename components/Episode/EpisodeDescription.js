import { useState } from "react";
import SVGIcon from "../Icons";
import { DescriptionText, StyledFoldButton } from "./Episode.styled";

export default function EpisodeDescription({ description }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <>
      <StyledFoldButton
        type="button"
        onClick={() => setShowDescription(!showDescription)}
      >
        Beschreibung
        <SVGIcon
          variant={showDescription ? "chevronUp" : "chevronDown"}
          width="28px"
        />
      </StyledFoldButton>
      {showDescription && <DescriptionText>{description}</DescriptionText>}
    </>
  );
}
