import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  const { accessToken } = token;
  const { trackURI } = req.query;
  const trackID = trackURI.split(":")[2];

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  if (accessToken && trackURI)
    switch (req.method) {
      case "GET": {
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${trackID}`,
          {
            method: "GET",
            headers,
          }
        );

        if (response.ok) {
          const data = await response.json();
          return res.status(200).json(data);
        }
        return res
          .status(404)
          .json({ status: "COULD NOT FIND REQUESTED DATA" });
      }
      default: {
        return res.status(405).json({ status: "METHOD NOT ALLOWED" });
      }
    }
}
