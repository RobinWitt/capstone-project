import EpisodeCard from "@/components/Episode/EpisodeCard";
import EpisodeCardHeader from "@/components/Episode/EpisodeCardHeader";
import { getCoverURL } from "@/components/Episode/EpisodeFunctions";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function EpisodePage() {
  const router = useRouter();
  const { currentEpisode } = router.query;

  const { data, isLoading, error } = useSWR(`/api/episodes/${currentEpisode}`);

  if (error) return <div>Folge nicht gefunden</div>;
  if (isLoading) return <div>wird geladen...</div>;

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

    const coverlink = getCoverURL(links);

    return (
      <main>
        <EpisodeCard
          number={number}
          title={title}
          coverlink={coverlink}
          author={author}
          scriptauthor={scriptauthor}
          releasedate={releasedate}
          description={description}
          chapters={chapters}
          speakers={speakers}
          parts={parts}
          incomplete={incomplete}
        >
          <EpisodeCardHeader episodeNumber={number} />
        </EpisodeCard>
      </main>
    );
  }
}
