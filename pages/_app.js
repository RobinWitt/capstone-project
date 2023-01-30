import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import GlobalStyle from "@/styles";
import Head from "next/head";
import { SWRConfig } from "swr";
import useSWR from "swr";
import { useAtom, atom } from "jotai";

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const URL_ = "/api/episodes";
export const episodes = atom([]);

export default function App({ Component, pageProps }) {
  const { data, isLoading, error } = useSWR(URL_, fetcher);
  const [, setAllEpisodes] = useAtom(episodes);

  if (data) setAllEpisodes(data);

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Projekt Justus.Peter.Bob.</title>
      </Head>
      <SWRConfig value={{ fetcher }}>
        <Header />
        {error ? (
          <div>
            Hoppla, scheinbar ist der Server gerade nicht erreichbar. Versuche
            es doch später nochmal.
          </div>
        ) : isLoading ? (
          <div>Folgen werden geladen...</div>
        ) : (
          <Component {...pageProps} />
        )}
        <Navigation />
      </SWRConfig>
    </>
  );
}
