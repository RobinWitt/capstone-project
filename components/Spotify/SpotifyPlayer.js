import styled, { css, keyframes } from "styled-components";
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
  // https://beta.reactjs.org/reference/react/useRef
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
            <TrackContainer>
              {currentTrack && (
                <CurrentTrackBanner>{currentTrack.name}</CurrentTrackBanner>
              )}
            </TrackContainer>
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
  height: fit-content;
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

const TrackContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  border-bottom: 2px solid var(--background-secondary);
`;

// https://medium.com/@matt.readout/adding-css-animations-with-styled-components-6c191c23b6ba

const trackAnimation = keyframes`
  0%, 20% {transform: translateX(0%);left: 0%;}
  80%, 100% {transform: translateX(-100%);left: 100%;}
`;

const CurrentTrackBanner = styled.span`
  color: var(--background); opacity 0.7;
  padding-top: 0.2rem;
  display: inline-block;
  position: relative;
  // animation-name: ${trackAnimation};
  // animation-duration: 3s;
  // animation-direction: alternate;
  // animation-iteration-count: infinite;
  // animation-timing-function: ease-in-out;`;

const PlayControlButtons = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: var(--background-secondary);
`;
