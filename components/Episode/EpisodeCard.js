import {
  EpisodeFacts,
  EpisodeImage,
  NoContentMessage,
  StartPlayerButton,
  StyledEpisodeCard,
} from "./Episode.styled";
import EpisodeDescription from "./EpisodeDescription";
import { useSession } from "next-auth/react";
import { useAtom } from "jotai";
import axios from "axios";
import { getCoverURL, getFormattedDate } from "./EpisodeFunctions";
import Chapters from "./Chapters";
import Parts from "./Parts";
import Speakers from "./Speakers";
import { initialShowPlayer } from "../Spotify/SpotifyPlayer";
import { initialDeviceID } from "../Spotify/SpotifyPlayerModule";

export default function EpisodeCard({
  children,
  number,
  title,
  coverlink,
  author,
  scriptauthor,
  releasedate,
  description,
  speakers,
  chapters,
  parts,
  incomplete,
  isReleased,
}) {
  const { data: session } = useSession();
  const [deviceID] = useAtom(initialDeviceID);
  const [, setShowPlayer] = useAtom(initialShowPlayer);

  async function handleStartPlayer() {
    if (session && deviceID) {
      const token = session.accessToken;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const body = {
        context_uri: "spotify:album:4N9tvSjWfZXx3eHKblYEWQ",
      };

      const queryParams = {
        device_id: deviceID,
      };

      axios
        .put("https://api.spotify.com/v1/me/player/play", body, {
          headers,
          params: queryParams,
        })
        .then((response) => {
          console.log("Started playback", response.status, response.statusText);
        })
        .catch((error) => {
          console.error(error);
        });
      setShowPlayer(true);
    }
  }

  return (
    <StyledEpisodeCard>
      {children}
      {coverlink ? (
        <EpisodeImage
          src={getCoverURL(coverlink)}
          alt={`Folge ${number}, Die Drei Fragezeichen ${title}`}
          width={400}
          height={400}
          priority
        />
      ) : (
        <NoContentMessage>kein Artwork vorhanden</NoContentMessage>
      )}
      {/* https://blog.sethcorker.com/question/how-to-solve-referenceerror-next-js-window-is-not-defined/ */}
      {session && isReleased && (
        <StartPlayerButton onClick={handleStartPlayer}>
          Folge abspielen
        </StartPlayerButton>
      )}
      {author ? (
        <EpisodeFacts>Autor*in: {author}</EpisodeFacts>
      ) : (
        <NoContentMessage>
          {parts ? "" : "kein*e Autor*in angegeben"}
        </NoContentMessage>
      )}
      {scriptauthor ? (
        <EpisodeFacts>Hörspielskript-Autor*in: {scriptauthor}</EpisodeFacts>
      ) : (
        <NoContentMessage>
          kein*e Hörspielskript-Autor*in angegeben
        </NoContentMessage>
      )}
      {releasedate ? (
        <EpisodeFacts>
          Veröffentlichungsdatum: {getFormattedDate(releasedate)}
        </EpisodeFacts>
      ) : (
        <NoContentMessage>
          kein Veröffentlichungsdatum angegeben
        </NoContentMessage>
      )}
      {description ? (
        <EpisodeDescription description={description} />
      ) : (
        <NoContentMessage>keine Beschreibung vorhanden</NoContentMessage>
      )}
      {speakers?.length ? (
        <Speakers speakers={speakers} />
      ) : (
        <NoContentMessage>keine Stimmen angegeben</NoContentMessage>
      )}
      {chapters?.length ? (
        <Chapters chapters={chapters} />
      ) : (
        <NoContentMessage>
          {parts?.length ? "" : "keine Kapitelliste vorhanden"}
        </NoContentMessage>
      )}
      {parts?.length > 0 &&
        parts.map((part) => {
          return <Parts key={part.buchstabe} part={part} />;
        })}
      {incomplete && (
        <EpisodeFacts>diese Folge wird noch vervollständigt</EpisodeFacts>
      )}
    </StyledEpisodeCard>
  );
}
