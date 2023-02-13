import { useAtom, atom } from "jotai";
import { useSession } from "next-auth/react";
import { initialPlayerModule } from "./SpotifyPlayer";

export const initialDeviceID = atom("");

export default function SpotifyPlayerModule() {
  const { data: session } = useSession();
  const [playerInstance, setPlayerInstance] = useAtom(initialPlayerModule);
  const [deviceID, setDeviceID] = useAtom(initialDeviceID);

  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: "Die Drei ??? - inoffizieller Guide",
      getOAuthToken: (cb) => {
        cb(session.accessToken);
      },
      volume: 0.3,
    });

    // Ready
    player.addListener("ready", ({ device_id }) => {
      setDeviceID(device_id);
    });

    // Not Ready
    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline");
    });

    player.addListener("initialization_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("authentication_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("account_error", ({ message }) => {
      console.error(message);
    });

    player.connect();

    setPlayerInstance(player);
  };
}