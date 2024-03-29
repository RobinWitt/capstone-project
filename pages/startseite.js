import { useEffect } from "react";
import { useAtom, atom } from "jotai";
import useSWR from "swr";
import EpisodesList from "@/components/EpisodesList/EpisodesList";
import EpisodeListItem from "@/components/EpisodesList/EpisodeItem";
import {
  getMostRecentEpisode,
  filterEpisodes,
  isEpisodeReleased,
  sortEpisodesByDate,
} from "@/components/Episode/EpisodeFunctions";
import RandomEpisode from "@/components/RandomEpisode/RandomEpisodeListItem";
import {
  ListHeadContainer,
  ListHeader,
  OverviewText,
} from "@/components/EpisodesList/EpisodesList.styled";
import ListNavigation from "@/components/EpisodesList/ListNavigation";
import Searchbar, { initialSearch } from "@/components/EpisodesList/Searchbar";
import JumpTopButton from "@/components/EpisodesList/JumpTopButton";
import EpisodeLastPlayedItem from "@/components/EpisodesList/EpisodeLastPlayedItem";
import { initialAccountError } from "@/components/Spotify/SpotifyPlayerModule";
import { useSession } from "next-auth/react";
import MessageError from "@/components/MessageError";
import MessageLoading from "@/components/MessageLoading";

export const initialScroll = atom(0);
export const initialSort = atom(true);
export const initialFilter = atom(false);

export default function HomePage() {
  const { data: session } = useSession();
  const [search] = useAtom(initialSearch);
  const {
    data: allEpisodes,
    isLoading: episodesAreLoading,
    error: episodesError,
  } = useSWR("/api/episodes");
  const { data: userData, mutate } = useSWR(session ? "/api/user" : null);

  // _____________________________________________________________________________
  // scroll restoration adapted from => https://codesandbox.io/s/cocky-drake-1xe0g

  const [scrollY, setScrollY] = useAtom(initialScroll);

  useEffect(() => {
    window.scrollTo(0, scrollY);
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // end of scroll restoration
  // __________________________________________________________________________

  function handleJumpTop() {
    window.scrollTo(0, 0, {
      behavior: "smooth",
    });
  }

  // __________________________________________________________________________

  const [ascending] = useAtom(initialSort);
  const [filter] = useAtom(initialFilter);
  const [accountError] = useAtom(initialAccountError);

  // __________________________________________________________________________

  if (episodesError) return <MessageError />;
  if (episodesAreLoading) return <MessageLoading />;

  // __________________________________________________________________________

  if (allEpisodes) {
    const mostRecentEpisode = getMostRecentEpisode(allEpisodes);
    const isReleased = isEpisodeReleased(mostRecentEpisode);
    const sortedEpisodes = sortEpisodesByDate(allEpisodes, ascending);
    const filteredEpisodes = filterEpisodes(sortedEpisodes, filter);

    return (
      <>
        {accountError && <OverviewText>{accountError}</OverviewText>}
        {userData?.lastPlayed?.albumURI && userData?.lastPlayed?.trackURI && (
          <>
            <ListHeader>Zuletzt gehört:</ListHeader>
            <EpisodesList>
              <EpisodeLastPlayedItem userData={userData} reload={mutate} />
            </EpisodesList>
          </>
        )}
        {mostRecentEpisode && (
          <>
            <ListHeader>
              {isReleased ? "Zuletzt erschienen" : "Erscheint demnächst"}
            </ListHeader>
            <EpisodesList>
              <EpisodeListItem
                episode={mostRecentEpisode}
                userData={userData}
                reload={mutate}
              />
            </EpisodesList>
          </>
        )}
        <ListHeader>Zufällige Folge</ListHeader>
        <RandomEpisode />
        <ListHeader>Alle Folgen</ListHeader>
        <ListHeadContainer>
          <Searchbar />
          <ListNavigation />
        </ListHeadContainer>
        <EpisodesList>
          {filteredEpisodes
            .filter(
              ({ nummer, titel }) =>
                nummer.toString().includes(search.toLowerCase()) ||
                titel.toLowerCase().includes(search.toLowerCase())
            )
            .map((episode) => {
              return (
                <EpisodeListItem
                  key={episode.nummer}
                  episode={episode}
                  userData={userData}
                  reload={mutate}
                />
              );
            })}
        </EpisodesList>
        {scrollY > 250 && <JumpTopButton onJumpTop={handleJumpTop} />}
      </>
    );
  }
}
