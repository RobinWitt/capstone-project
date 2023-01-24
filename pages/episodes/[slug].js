import EpisodeDetails from "@/components/EpisodeDetails";
import { useRouter } from "next/router";
import useSWR from "swr";

// this will change when using remote API
const URL = "/serie.json";

export default function EpisodeDetailsPage() {
  // fetch data
  // this logic will change when using remote API
  const { data, error, isLoading } = useSWR(URL);
  // get episode slug
  const router = useRouter();
  const { slug } = router.query;

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  if (data) {
    const { serie } = data;
    // filter correct episode
    // this logic will change when using remote API
    const [filteredEpisode] = serie
      .slice()
      .filter((episode) => episode.nummer === parseInt(slug));

    return (
      <main>
        <EpisodeDetails episode={filteredEpisode} />
      </main>
    );
  }
}
