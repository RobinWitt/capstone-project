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
  background: yellow;
  padding: 0.5rem;
`;

export default function JumpTopButton({ onJumpTop }) {
  return (
    <JumpToTopButton onClick={onJumpTop}>
      <SVGIcon variant="arrowUpThin" width="35px" />
    </JumpToTopButton>
  );
}
