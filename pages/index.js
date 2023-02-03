import EpisodesList from "@/components/EpisodesList/EpisodesList";
import EpisodeListItem from "@/components/EpisodesList/EpisodeItem";
import useSWR from "swr";
import {
  getMostRecentEpisode,
  isEpisodeReleased,
} from "@/components/Episode/EpisodeFunctions";
import RandomEpisode from "@/components/RandomEpisode/RandomEpisodeListItem";
import {
  ListHeadContainer,
  ListHeader,
} from "@/components/EpisodesList/EpisodesList.styled";
import { useEffect } from "react";
import { useAtom, atom } from "jotai";
import ListNavigation from "@/components/EpisodesList/ListNavigation";
import Searchbar, { initialSearch } from "@/components/EpisodesList/Searchbar";

const URL = "/api/episodes";
export const initialScroll = atom(0);

export default function HomePage() {
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
  });
  // end of scroll restoration

  const { data: allEpisodes, isLoading, error } = useSWR(URL);

  if (error) return <div>error</div>;
  if (isLoading) return <div>loading...</div>;

  if (allEpisodes) {
    const mostRecentEpisode = getMostRecentEpisode(allEpisodes);
    const isReleased = isEpisodeReleased(mostRecentEpisode);

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
          <ListHeadContainer>
            <ListHeader>Alle Folgen</ListHeader>
            <Searchbar />
          </ListHeadContainer>
          <ListNavigation />
          <EpisodesList>
            {allEpisodes
              .filter(({ titel }) => titel.toLowerCase().includes(search))
              .map((episode) => {
                return (
                  <EpisodeListItem key={episode.nummer} episode={episode} />
                );
              })}
          </EpisodesList>
        </main>
      </>
    );
  }
}
