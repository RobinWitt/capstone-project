import { useRouter } from "next/router";
import useSWR from "swr";
import EpisodeCard from "@/components/Episode/EpisodeCard";
import EpisodeCardHeader from "@/components/Episode/EpisodeCardHeader";
import { ListHeader } from "@/components/EpisodesList/EpisodesList.styled";

export default function EpisodePage() {
  const router = useRouter();
  const { currentEpisode } = router.query;

  const { data, isLoading, error } = useSWR(`/api/episodes/${currentEpisode}`);
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
    mutate,
  } = useSWR("/api/user");

  if (error)
    return (
      <main>
        <ListHeader>Fehler beim Laden</ListHeader>
      </main>
    );
  if (isLoading)
    return (
      <main>
        <ListHeader>wird geladen...</ListHeader>
      </main>
    );

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

    return (
      <main>
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
        >
          <EpisodeCardHeader
            episodeNumber={number}
            userData={userData}
            reload={mutate}
          />
        </EpisodeCard>
      </main>
    );
  }
}
