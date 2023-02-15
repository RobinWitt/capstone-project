import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAtom } from "jotai";
import { initialShowPlayer } from "../Spotify/SpotifyPlayer";
import { initialDeviceID } from "../Spotify/SpotifyPlayerModule";
import useSWR from "swr";
import { getCoverURL, getFormattedDate } from "./EpisodeFunctions";
import {
  EpisodeFacts,
  EpisodeImage,
  NoContentMessage,
  StartPlayerButton,
  StyledEpisodeCard,
} from "./Episode.styled";
import EpisodeDescription from "./EpisodeDescription";
import Chapters from "./Chapters";
import Parts from "./Parts";
import Speakers from "./Speakers";
import SVGIcon from "../Icons";

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
  const [spotifyAlbumURI, setSpotifyAlbumURI] = useState();

  // __________________________________________________________________________

  const { data } = useSWR(
    session && !spotifyAlbumURI ? `/api/getURI/${title}` : null
  );
  if (data) {
    setSpotifyAlbumURI(data.albums.items[0].uri);
  }

  // __________________________________________________________________________

  async function handleStartPlayer() {
    if (session && deviceID && spotifyAlbumURI) {
      try {
        await fetch(`/api/startPlayer`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            albumURI: spotifyAlbumURI,
            deviceID,
          }),
        });
      } catch (error) {
        console.error(error.message);
      }
      setShowPlayer(true);
    }
  }

  // __________________________________________________________________________

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
      {session && isReleased && deviceID && spotifyAlbumURI && (
        <StartPlayerButton aria-label="Folge hören" onClick={handleStartPlayer}>
          <SVGIcon variant="spotify" width="30px" />
          Folge hören
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
