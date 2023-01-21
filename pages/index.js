import useSWR from "swr";

const URL = "/serie.json";

export default function HomePage() {
  const { data, error, isLoading } = useSWR(URL);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  if (data) console.log(data.serie[0].nummer, data.serie[0].titel);
  return (
    <>
      <header>
        <h1>Projekt Justus.Peter.Bob.</h1>
      </header>
    </>
  );
}
