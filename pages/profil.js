import { LogButton } from "@/components/Authentication/Login.styled";
import { ListHeader } from "@/components/EpisodesList/EpisodesList.styled";
import SVGIcon from "@/components/Icons";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ProfilePage() {
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
      <LogButton
        type="button"
        onClick={() => {
          signOut();
        }}
      >
        <SVGIcon variant="spotify" width="40px" />
        Logout
      </LogButton>
    </>
  );
}
