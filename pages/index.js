import EpisodeList from "@/components/EpisodeList";
import EpisodeListItem from "@/components/EpisodeListItem";
import useSWR from "swr";

const URL = "/serie.json";

export default function HomePage() {
  const { data, error, isLoading } = useSWR(URL);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  if (data) {
    const { serie } = data;
    return (
      <>
        <main>
          <h2>Alle Folgen</h2>
          <EpisodeList>
            {serie.map(({ nummer: number, titel: title, teile: parts }) => {
              return (
                <EpisodeListItem
                  key={number}
                  episodeNumber={number}
                  title={title}
                  parts={parts}
                  href={`/episodes/${number}`}
                />
              );
            })}
          </EpisodeList>
        </main>
      </>
    );
  }
}
