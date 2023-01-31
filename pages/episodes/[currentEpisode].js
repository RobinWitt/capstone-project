import EpisodeCard from "@/components/Episode/EpisodeCard";
import EpisodeCardHeader from "@/components/Episode/EpisodeCardHeader";
import { getCoverURL } from "@/components/Episode/EpisodeFunctions";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { episodes } from "../_app";

export default function EpisodePage() {
  const [allEpisodes] = useAtom(episodes);

  const router = useRouter();
  const { currentEpisode } = router.query;

  const [filteredEpisode] = allEpisodes.filter(
    (episode) => episode.nummer === parseInt(currentEpisode)
  );

  if (!filteredEpisode) {
    return (
      <main>
        <h2>Diese Folge scheint es nicht zu geben.</h2>
      </main>
    );
  }

  const {
    nummer: number,
    titel: title,
    autor: author,
    hörspielskriptautor: scriptauthor,
    beschreibung: description,
    veröffentlichungsdatum: releasedate,
    kapitel: chapters,
    links,
    teile: parts,
  } = filteredEpisode;

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
        parts={parts}
      >
        <EpisodeCardHeader episodeNumber={number} />
      </EpisodeCard>
    </main>
  );
}
