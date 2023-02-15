import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  const { accessToken } = token;
  const { title } = req.query;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  if (accessToken && title)
    switch (req.method) {
      case "GET": {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=Die%20drei%20???%20${title}&type=album&limit=1`,
          {
            method: "GET",
            headers,
          }
        );

        if (response.ok) {
          const data = await response.json();
          return res.status(200).json(data);
        }
        return res.status(404).json({ status: "COULD NOT FIND ALBUM URI" });
      }
      default: {
        return res.status(405).json({ status: "METHOD NOT ALLOWED" });
      }
    }
}
