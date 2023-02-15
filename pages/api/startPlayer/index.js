import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  const token = await getToken({ req: request });
  const { accessToken } = token;
  const { albumURI, trackURI, deviceID } = await request.body;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  function getOffsetValue() {
    if (trackURI) {
      return { uri: trackURI };
    } else {
      return { position: 0 };
    }
  }

  const offsetValue = getOffsetValue();

  if (accessToken && deviceID)
    switch (request.method) {
      case "PUT": {
        const playbackResponse = await fetch(
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

        if (!playbackResponse.ok) {
          return response.status(404).json({ status: "COULD NOT OPEN PLAYER" });
        }
        return response.status(200).json({ status: "PLAYER STARTED" });
      }
      default: {
        return response.status(405).json({ status: "METHOD NOT ALLOWED" });
      }
    }
}
