import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import GlobalStyle from "@/styles";
import Head from "next/head";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import SpotifyPlayer, {
  initialShowPlayer,
} from "@/components/Spotify/SpotifyPlayer";
import { MainLayout } from "@/components/Layout";
import { useAtom } from "jotai";

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

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [showPlayer] = useAtom(initialShowPlayer);

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>D1E DR3I ??? - inoffizieller Guide</title>
      </Head>
      <SessionProvider session={session}>
        <SWRConfig value={{ fetcher }}>
          <Header />
          <MainLayout showPlayer={showPlayer}>
            <Component {...pageProps} />
          </MainLayout>
          {/* https://blog.sethcorker.com/question/how-to-solve-referenceerror-next-js-window-is-not-defined/ */}
          {typeof window !== undefined && <SpotifyPlayer />}
          <Navigation />
        </SWRConfig>
      </SessionProvider>
    </>
  );
}
