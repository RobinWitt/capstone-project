import styled from "styled-components";
import SVGIcon from "../Icons";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { atom, useAtom } from "jotai";
import SpotifyPlayerModule from "./SpotifyPlayerModule";

export const initialShowPlayer = atom(false);

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

  function handleReOpenPlayer() {
    setShowPlayer(true);
  }

  if (session) {
    return (
      <>
        <Script src="https://sdk.scdn.co/spotify-player.js"></Script>
        <SpotifyPlayerModule initialPlayerModuleRef={initialPlayerModuleRef} />
        {showPlayer && playerInstance && (
          <PlayerContainer>
            <PlayControlContainer>
              <PlayControlButtons
                onClick={() => playerInstance.previousTrack()}
                aria-label="vorheriger Track"
              >
                <SVGIcon variant="skipPrevious" width="30px" />
              </PlayControlButtons>
              <PlayControlButtons
                onClick={() => {
                  isPaused ? playerInstance.resume() : playerInstance.pause();
                }}
                aria-label={isPaused ? "Play" : "Pause"}
              >
                <SVGIcon variant={isPaused ? "play" : "pause"} width="30px" />
              </PlayControlButtons>
              <PlayControlButtons
                onClick={() => playerInstance.nextTrack()}
                aria-label="nächster Track"
              >
                <SVGIcon variant="skipNext" width="30px" />
              </PlayControlButtons>
              <PlayControlButtons
                onClick={() => {
                  setShowPlayer(false);
                }}
                aria-label="player minimieren"
              >
                <SVGIcon variant="chevronDown" width="30px" />
              </PlayControlButtons>
            </PlayControlContainer>
            <TrackContainer>
              {currentTrack && (
                <CurrentTrackBanner>{currentTrack.name}</CurrentTrackBanner>
              )}
            </TrackContainer>
          </PlayerContainer>
        )}
        {!showPlayer && playerInstance && currentTrack && (
          <ReOpenPlayer
            type="button"
            onClick={handleReOpenPlayer}
            aria-label="player wieder öffnen"
          >
            <SVGIcon variant="chevronUp" width="30px" />
          </ReOpenPlayer>
        )}
      </>
    );
  }
}

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 500px;
  height: fit-content;
  text-align: center;
  background-color: var(--primary);
  border-radius: 5px 5px 0 0;
`;

const PlayControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 5px;
  padding-top: 5px;
`;

const TrackContainer = styled.div`
  width: 100%;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  border-top: 2px solid var(--background-secondary);
`;

// https://blog.hubspot.com/website/scrolling-text-css

const CurrentTrackBanner = styled.span`
  color: var(--background);
  opacity: 0.7;
  padding-bottom: 0.2rem;
  display: inline-block;
  -moz-transform: translateX(100%);
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
  -moz-animation: my-animation 15s linear infinite;
  -webkit-animation: my-animation 15s linear infinite;
  animation: my-animation 15s linear infinite;

  /* for Firefox */
  @-moz-keyframes my-animation {
    from {
      -moz-transform: translateX(100%);
    }
    to {
      -moz-transform: translateX(-100%);
    }
  }

  /* for Chrome */
  @-webkit-keyframes my-animation {
    from {
      -webkit-transform: translateX(100%);
    }
    to {
      -webkit-transform: translateX(-100%);
    }
  }

  @keyframes my-animation {
    from {
      -moz-transform: translateX(100%);
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    to {
      -moz-transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }
`;

const PlayControlButtons = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: var(--background-secondary);
`;

const ReOpenPlayer = styled.button`
  position: fixed;
  bottom: 60px;
  left: 80%;
  transform: translateX(-50%);
  height: 25px;
  background-color: var(--primary);
  border-radius: 5px 5px 0 0;
  border: none;
`;
