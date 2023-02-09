import { LogButton } from "@/components/Authentication/Login.styled";
import { ListHeader } from "@/components/EpisodesList/EpisodesList.styled";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import Link from "next/link";

export default function LandingPage({ providers }) {
  const { data: session } = useSession();

  console.log(session);

  return (
    <main>
      <ListHeader>
        {session
          ? `Eingeloggt als: ${session.user.name}`
          : `Du bist nicht eingeloggt.`}
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
            ? `Ausloggen bei ${provider.name}`
            : `Einloggen mit ${provider.name}`}
        </LogButton>
      ))}

      <ListHeader>oder</ListHeader>
      <Link href={"/startseite"}>Ohne Account nutzen</Link>
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
