import styled from "styled-components";
import SVGIcon from "../Icons";

const JumpToTopButton = styled.button`
  position: fixed;
  bottom: 5.5rem;
  left: 2rem;
  display: flex;
  align-items: center;
  width: fit-content;
  border: none;
  border-radius: 999px;
  background: var(--accent);
  padding: 0.5rem;
`;

export default function JumpTopButton({ onJumpTop }) {
  return (
    <JumpToTopButton
      onClick={onJumpTop}
      aria-label="zum Start der Liste springen"
    >
      <SVGIcon variant="arrowUp" width="35px" />
    </JumpToTopButton>
  );
}
