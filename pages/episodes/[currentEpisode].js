import EpisodeDetails from "@/components/EpisodeDetails";
import PartDetails from "@/components/EpisodeDetails/PartDetails";
import { useRouter } from "next/router";
import useSWR from "swr";

const URL = "/serie.json";

export default function EpisodeDetailsPage() {
  const { data, error, isLoading } = useSWR(URL);

  const router = useRouter();
  const { currentEpisode } = router.query;

  if (error) return <div>failed to load</div>;
  if (!currentEpisode || isLoading) return <div>loading...</div>;

  if (data) {
    const { serie } = data;

    const [filteredEpisode] = serie.filter(
      (episode) => episode.nummer === parseInt(currentEpisode)
    );

    if (!filteredEpisode) {
      return (
        <main>
          <h2>Hoppla, diese Folge scheint es nicht zu geben.</h2>
        </main>
      );
    }

    return (
      <main>
        <EpisodeDetails episode={filteredEpisode} />
      </main>
    );
  }
}
