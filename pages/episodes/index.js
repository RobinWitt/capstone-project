import EpisodeDetails from "@/components/EpisodeDetails";
import Image from "next/image";
import useSWR from "swr";

const URL = "/serie.json";

export default function EpisodeDetailPage() {
  const { data, error, isLoading } = useSWR(URL);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  if (data) {
    const { serie } = data;

    return <EpisodeDetails episode={serie[0]} />;
  }
}
