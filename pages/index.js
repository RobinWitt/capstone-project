import { Greetings, LogButton } from "@/components/Authentication/Login.styled";
import { ListHeader } from "@/components/EpisodesList/EpisodesList.styled";
import SVGIcon from "@/components/Icons";
import { useSession, signIn, getProviders } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LandingPage({ providers }) {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/startseite");
  }

  if (!session)
    return (
      <>
        {Object.values(providers).map((provider) => (
          <LogButton
            key={provider.id}
            type="button"
            onClick={() => {
              signIn(provider.id, { callbackUrl: "/startseite" });
            }}
          >
            <SVGIcon variant="spotify" width="40px" />
            {`${provider.name} Login`}
          </LogButton>
        ))}
        <Greetings>
          Um dich einloggen und alle Funktionen nutzen zu können musst du zur
          Whitelist hinzugefügt werden
        </Greetings>
        <Link href="https://neuefische-students.slack.com/team/U04A4P56L6M">
          Nachricht in Slack senden
        </Link>

        <ListHeader>oder</ListHeader>
        <Link href={"/startseite"}>Ohne Account nutzen</Link>
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
