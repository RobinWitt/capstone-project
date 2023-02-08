import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useEffect } from "react";
import { useAtom, atom } from "jotai";
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
} from "@/components/EpisodesList/EpisodesList.styled";
import ListNavigation from "@/components/EpisodesList/ListNavigation";
import Searchbar, { initialSearch } from "@/components/EpisodesList/Searchbar";
import JumpTopButton from "@/components/EpisodesList/JumpTopButton";

const URL = "/api/episodes";
export const initialScroll = atom(0);
export const initialSort = atom(true);
export const initialFilter = atom(false);

export default function HomePage() {
  const { data: session } = useSession();
  const [search] = useAtom(initialSearch);
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

  function handleJumpTop() {
    window.scrollTo(0, 0, {
      behavior: "smooth",
    });
  }

  const {
    data: allEpisodes,
    isLoading: episodesAreLoading,
    error: episodesError,
  } = useSWR(URL);

  const [ascending] = useAtom(initialSort);
  const [filter] = useAtom(initialFilter);

  if (episodesError)
    return (
      <main>
        <h2>Fehler beim Laden</h2>
      </main>
    );
  if (episodesAreLoading)
    return (
      <main>
        <h2>wird geladen...</h2>
      </main>
    );

  if (allEpisodes) {
    const mostRecentEpisode = getMostRecentEpisode(allEpisodes);
    const isReleased = isEpisodeReleased(mostRecentEpisode);
    const sortedEpisodes = sortEpisodesByDate(allEpisodes, ascending);
    const filteredEpisodes = filterEpisodes(sortedEpisodes, filter);

    return (
      <>
        <main>
          <ListHeader>
            {isReleased ? "Zuletzt erschienen" : "Erscheint demnächst"}
          </ListHeader>
          {mostRecentEpisode && (
            <>
              <EpisodesList>
                <EpisodeListItem episode={mostRecentEpisode} />
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
                  <EpisodeListItem key={episode.nummer} episode={episode} />
                );
              })}
          </EpisodesList>
          {scrollY > 120 && <JumpTopButton onJumpTop={handleJumpTop} />}
        </main>
      </>
    );
  }
}
