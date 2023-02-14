import { useRouter } from "next/router";
import useSWR from "swr";
import EpisodeCard from "@/components/Episode/EpisodeCard";
import EpisodeCardHeader from "@/components/Episode/EpisodeCardHeader";
import { ListHeader } from "@/components/EpisodesList/EpisodesList.styled";
import JumpTopButton from "@/components/EpisodesList/JumpTopButton";
import { useEffect, useState } from "react";
import { isEpisodeReleased } from "@/components/Episode/EpisodeFunctions";

export default function EpisodePage() {
  const router = useRouter();
  const { currentEpisode } = router.query;

  // __________________________________________________________________________

  const [scrollY, setScrollY] = useState();

  useEffect(() => {
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

  function handleJumpTop() {
    window.scrollTo(0, 0, {
      behavior: "smooth",
    });
  }
  // __________________________________________________________________________

  const { data, isLoading, error } = useSWR(
    currentEpisode ? `/api/episodes/${currentEpisode}` : null
  );
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
    mutate,
  } = useSWR("/api/user");

  if (error) return <ListHeader>Fehler beim Laden</ListHeader>;
  if (isLoading) return <ListHeader>wird geladen...</ListHeader>;

  if (data) {
    const {
      nummer: number,
      titel: title,
      autor: author,
      hörspielskriptautor: scriptauthor,
      beschreibung: description,
      veröffentlichungsdatum: releasedate,
      sprecher: speakers,
      kapitel: chapters,
      links,
      teile: parts,
      unvollständig: incomplete,
    } = data;

    const isReleased = isEpisodeReleased(data);

    return (
      <>
        <EpisodeCard
          number={number}
          title={title}
          coverlink={links}
          author={author}
          scriptauthor={scriptauthor}
          releasedate={releasedate}
          description={description}
          chapters={chapters}
          speakers={speakers}
          parts={parts}
          incomplete={incomplete}
          isReleased={isReleased}
        >
          <EpisodeCardHeader
            episodeNumber={number}
            userData={userData}
            reload={mutate}
          />
        </EpisodeCard>
        {scrollY > 250 && <JumpTopButton onJumpTop={handleJumpTop} />}
      </>
    );
  }
}
