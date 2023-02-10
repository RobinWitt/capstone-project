const scopes = [
  "user-read-email",
  "user-read-private",
  "streaming",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-library-read",
  // "user-library-modify",
].join(",");

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize${queryParamString.toString()}`;

export { LOGIN_URL };
