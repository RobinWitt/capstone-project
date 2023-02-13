import { LogButton } from "@/components/Authentication/Login.styled";
import { ListHeader } from "@/components/EpisodesList/EpisodesList.styled";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function LandingPage({ providers }) {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    data: userData,
    userIsLoading,
    userError,
  } = useSWR(session ? "/api/user" : null);

  if (userError)
    return <ListHeader>Nutzerdaten konnten nicht geladen werden.</ListHeader>;
  if (userIsLoading)
    return <ListHeader>Nutzerdaten werden geladen...</ListHeader>;

  return (
    <>
      {Object.values(providers).map((provider) => (
        <LogButton
          key={provider.id}
          type="button"
          onClick={() => {
            session ? signOut(provider.id) : signIn(provider.id);
          }}
        >
          {session
            ? `Ausloggen von ${provider.name}`
            : `Einloggen bei ${provider.name}`}
        </LogButton>
      ))}

      {!session && (
        <>
          <ListHeader>oder</ListHeader>
          <Link href={"/startseite"}>Ohne Account nutzen</Link>
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
