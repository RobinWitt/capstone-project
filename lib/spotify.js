import { Buffer } from "buffer";
import axios from "axios";

// https://www.reddit.com/r/nextjs/comments/10o6aup/next_auth_spotify_reauthentication_access_token/

const SPOTIFY_REFRESH_TOKEN_URL = "https://accounts.spotify.com/api/token";

export async function refreshAccessToken(token) {
  try {
    const basicAuth = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");
    const response = await axios.post(
      SPOTIFY_REFRESH_TOKEN_URL,
      {
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      },
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return {
      ...token,
      accessToken: response.data.access_token,
      accessTokenExpires: Date.now() + response.data.expires_in * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
