import { useSession } from "next-auth/react";
import { useAtom } from "jotai";
import { initialShowPlayer } from "../Spotify/SpotifyPlayer";
import { initialDeviceID } from "../Spotify/SpotifyPlayerModule";
import { OverviewListItem, OverviewText } from "./EpisodesList.styled";
import { StartPlayerButton } from "../Episode/Episode.styled";

export default function EpisodeLastPlayedItem({ userData }) {
  const { data: session } = useSession();
  const { lastPlayed } = userData;
  const [deviceID] = useAtom(initialDeviceID);
  const [, setShowPlayer] = useAtom(initialShowPlayer);

  // __________________________________________________________________________

  async function handleStartPlayer() {
    if (session && deviceID) {
      try {
        await fetch(`/api/startPlayer`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            albumURI: lastPlayed.albumURI,
            trackURI: lastPlayed.trackURI,
            deviceID,
          }),
        });
      } catch (error) {
        console.error(error.message);
      }
      setShowPlayer(true);
    }
  }

  // __________________________________________________________________________

  if (session && deviceID && userData) {
    return (
      <OverviewListItem>
        <StartPlayerButton aria-label="Folge hören" onClick={handleStartPlayer}>
          Weiterhören
          <OverviewText>
            <p>Track</p>
          </OverviewText>
        </StartPlayerButton>
      </OverviewListItem>
    );
  }
}
