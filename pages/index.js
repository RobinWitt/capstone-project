import EpisodeList from "@/components/EpisodeList";
import EpisodeListItem from "@/components/EpisodeListItem";
import Link from "next/link";
import useSWR from "swr";

// this will change when using remote API
const URL = "/serie.json";

export default function HomePage() {
  const { data, error, isLoading } = useSWR(URL);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  if (data) {
    const { serie } = data;
    return (
      <>
        <header>
          <h1>Projekt Justus.Peter.Bob.</h1>
        </header>
        <EpisodeList>
          {serie.map(({ nummer, titel }) => {
            return (
              <EpisodeListItem
                key={nummer}
                nummer={nummer}
                titel={titel}
                href={`/episodes/${nummer}`}
              />
            );
          })}
        </EpisodeList>
      </>
    );
  }
}
