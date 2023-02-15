import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";

export default async function handler(request, response) {
  const token = await getToken({ req: request });
  const { accessToken } = token;
  const { title } = request.query;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  if (token && accessToken && title)
    switch (request.method) {
      case "GET": {
        const uriResponse = await fetch(
          `https://api.spotify.com/v1/search?q=Die%20drei%20???%20${title}&type=album&limit=1`,
          {
            method: "GET",
            headers,
          }
        );

        if (uriResponse.ok) {
          const data = await uriResponse.json();
          return response.status(200).json(data);
        }
        return response
          .status(404)
          .json({ status: "COULD NOT FIND ALBUM URI" });
      }
      default: {
        return response.status(405).json({ status: "METHOD NOT ALLOWED" });
      }
    }
}
