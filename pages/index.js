import EpisodeList from "@/components/EpisodeList";
import EpisodeListItem from "@/components/EpisodeListItem";
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
        <main>
          <EpisodeList>
            {serie.map(({ nummer: number, titel: title }) => {
              return (
                <EpisodeListItem
                  key={number}
                  episodeNumber={number}
                  title={title}
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
