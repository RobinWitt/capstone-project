import CreateAccForm from "@/components/Authentication/CreateAccForm";
import { LogButton } from "@/components/Authentication/Login.styled";
import LoginForm from "@/components/Authentication/LoginForm";
import { ListHeader } from "@/components/EpisodesList/EpisodesList.styled";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import Link from "next/link";
import useSWR from "swr";

export default function LandingPage({ providers }) {
  const { data, isLoading, error } = useSWR("/api/users/user");
  const { data: session } = useSession();

  if (error)
    return (
      <main>
        <ListHeader>Fehler beim Laden</ListHeader>
      </main>
    );
  if (isLoading)
    return (
      <main>
        <ListHeader>wird geladen...</ListHeader>
      </main>
    );

  if (data)
    return (
      <main>
        <ListHeader>Login</ListHeader>
        {session ? (
          <>
            <p>Eingeloggt als {session.user.email}</p>
            <LogButton
              type="button"
              onClick={() => {
                signOut();
              }}
            >
              Logout from Spotify
            </LogButton>
          </>
        ) : (
          <LogButton
            type="button"
            onClick={() => {
              signIn();
            }}
          >
            Login with Spotify
          </LogButton>
        )}

        <h2>oder</h2>
        <LoginForm />
        <h2>oder</h2>
        <CreateAccForm />
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
