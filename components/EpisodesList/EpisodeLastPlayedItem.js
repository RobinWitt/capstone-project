import { useSession } from "next-auth/react";
import { useAtom } from "jotai";
import { initialShowPlayer } from "../Spotify/SpotifyPlayer";
import { initialDeviceID } from "../Spotify/SpotifyPlayerModule";
import {
  LastPlayedButton,
  OverviewListItem,
  OverviewText,
  PreviewImage,
} from "./EpisodesList.styled";
import { useState } from "react";
import useSWR from "swr";

export default function EpisodeLastPlayedItem({ userData, reload }) {
  const { data: session } = useSession();
  const { lastPlayed } = userData;
  const [deviceID] = useAtom(initialDeviceID);
  const [, setShowPlayer] = useAtom(initialShowPlayer);
  const [spotifyData, setSpotifyData] = useState();

  // __________________________________________________________________________

  const { data } = useSWR(
    !spotifyData && lastPlayed.albumURI && lastPlayed.trackURI
      ? `/api/getAlbumData/${lastPlayed.trackURI}`
      : null
  );
  if (data) {
    setSpotifyData(data);
  }

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

  if (session && deviceID && lastPlayed?.albumURI && lastPlayed?.trackURI) {
    return (
      <OverviewListItem>
        <LastPlayedButton aria-label="Folge hören" onClick={handleStartPlayer}>
          {spotifyData && (
            <>
              <PreviewImage
                src={spotifyData.album.images[1].url}
                alt={`Cover Folge ${spotifyData.name}`}
                width={100}
                height={100}
              />
              <OverviewText>
                <span>{spotifyData.name}</span>
              </OverviewText>
            </>
          )}
        </LastPlayedButton>
      </OverviewListItem>
    );
  }
}
