import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  const token = await getToken({ req: request });
  const { accessToken } = token;
  const { trackURI } = request.query;
  const trackID = trackURI.split(":")[2];

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  if (accessToken && trackURI)
    switch (request.method) {
      case "GET": {
        const spotifyDataResponse = await fetch(
          `https://api.spotify.com/v1/tracks/${trackID}`,
          {
            method: "GET",
            headers,
          }
        );

        if (spotifyDataResponse.ok) {
          const data = await spotifyDataResponse.json();
          return response.status(200).json(data);
        }
        return response
          .status(404)
          .json({ status: "COULD NOT FIND requestUESTED DATA" });
      }
      default: {
        return response.status(405).json({ status: "METHOD NOT ALLOWED" });
      }
    }
}
