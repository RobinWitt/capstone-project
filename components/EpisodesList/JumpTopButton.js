import { useAtom } from "jotai";
import styled from "styled-components";
import SVGIcon from "../Icons";
import { initialShowPlayer } from "../Spotify/SpotifyPlayer";

export default function JumpTopButton({ onJumpTop }) {
  const [showPlayer] = useAtom(initialShowPlayer);

  return (
    <JumpToTopButton
      showPlayer={showPlayer}
      onClick={onJumpTop}
      aria-label="zum Start der Liste springen"
    >
      <SVGIcon variant="arrowUp" width="35px" />
    </JumpToTopButton>
  );
}

const JumpToTopButton = styled.button`
  position: fixed;
  bottom: ${(props) => (props.showPlayer ? "8rem" : "5.5rem")};
  left: 2rem;
  display: flex;
  align-items: center;
  width: fit-content;
  border: none;
  border-radius: 999px;
  background: var(--accent);
  padding: 0.5rem;
`;
