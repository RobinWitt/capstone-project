import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  const { accessToken } = token;
  const { albumURI, trackURI, deviceID } = await req.body;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const offsetValue = () => {
    if (trackURI) {
      return { uri: trackURI };
    } else {
      return { position: 0 };
    }
  };

  if (accessToken && deviceID)
    switch (req.method) {
      case "PUT": {
        const response = await fetch(
          `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify({
              context_uri: albumURI,
              offset: offsetValue,
            }),
          }
        );

        if (!response.ok) {
          return res.status(404).json({ status: "COULD NOT OPEN PLAYER" });
        }
        return res.status(200).json({ status: "PLAYER STARTED" });
      }
      default: {
        return res.status(405).json({ status: "METHOD NOT ALLOWED" });
      }
    }
}
