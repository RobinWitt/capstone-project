import { LogButton } from "@/components/Authentication/Login.styled";
import { ListHeader } from "@/components/EpisodesList/EpisodesList.styled";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function LandingPage({ providers }) {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    data: userData,
    userIsLoading,
    userError,
  } = useSWR(session && "/api/user");

  if (userError)
    return <ListHeader>Nutzerdaten konnten nicht geladen werden.</ListHeader>;
  if (userIsLoading)
    return <ListHeader>Nutzerdaten werden geladen...</ListHeader>;

  return (
    <main>
      <ListHeader>
        {session && `Eingeloggt als: ${session.user.name}`}
      </ListHeader>
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
    </main>
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
