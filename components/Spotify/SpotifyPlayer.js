import styled from "styled-components";
import SVGIcon from "../Icons";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { atom, useAtom } from "jotai";
import SpotifyPlayerModule from "./SpotifyPlayerModule";

export const initialShowPlayer = atom(false);
export const initialIsPaused = atom(true);

export default function SpotifyPlayer() {
  const { data: session } = useSession();
  const initialPlayerModuleRef = useRef(null);
  const playerInstance = initialPlayerModuleRef.current;
  const [showPlayer, setShowPlayer] = useAtom(initialShowPlayer);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTrack, setCurrentTrack] = useState("");

  useEffect(() => {
    function handlePlayerStateChanged() {
      playerInstance.getCurrentState().then((state) => {
        if (!state) {
          console.log("User is not playing music");
          return;
        }
        setIsPaused(state.paused);
        setCurrentTrack(state.track_window.current_track);
        // console.log(state);
        // setShowPlayer(!state.paused);
      });
    }

    if (playerInstance) {
      playerInstance.addListener(
        "player_state_changed",
        handlePlayerStateChanged
      );
    }

    return () => {
      if (playerInstance) {
        playerInstance.removeListener(
          "player_state_changed",
          handlePlayerStateChanged
        );
      }
    };
  }, [playerInstance]);

  if (session) {
    return (
      <>
        <Script src="https://sdk.scdn.co/spotify-player.js"></Script>
        <SpotifyPlayerModule initialPlayerModuleRef={initialPlayerModuleRef} />
        {showPlayer && playerInstance && (
          <PlayerContainer>
            <CurrentTrackDisplay>
              {currentTrack && currentTrack.name}
            </CurrentTrackDisplay>
            <PlayControlContainer>
              <PlayControlButtons
                id="previousTrack"
                onClick={() => playerInstance.previousTrack()}
              >
                <SVGIcon variant="skipPrevious" width="30px" />
              </PlayControlButtons>
              <PlayControlButtons
                id="togglePlay"
                onClick={() => {
                  isPaused ? playerInstance.resume() : playerInstance.pause();
                }}
              >
                <SVGIcon variant={isPaused ? "play" : "pause"} width="30px" />
              </PlayControlButtons>
              <PlayControlButtons
                id="nextTrack"
                onClick={() => playerInstance.nextTrack()}
              >
                <SVGIcon variant="skipNext" width="30px" />
              </PlayControlButtons>
              <PlayControlButtons
                id="nextTrack"
                onClick={() => {
                  playerInstance.pause(), setShowPlayer(false);
                }}
              >
                <SVGIcon variant="close" width="30px" />
              </PlayControlButtons>
            </PlayControlContainer>
          </PlayerContainer>
        )}
      </>
    );
  }
}

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: var(--primary);
  border-radius: 5px;
`;

const PlayControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 5px;
`;

const CurrentTrackDisplay = styled.span`
  color: var(--background); opacity 0.5;
  padding-top: 0.2rem;
  border-bottom: 2px solid var(--background-secondary);
`;

const PlayControlButtons = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: var(--background-secondary);
`;
