import { LogButton } from "@/components/Authentication/Login.styled";
import { ListHeader } from "@/components/EpisodesList/EpisodesList.styled";
import SVGIcon from "@/components/Icons";
import { useSession, signOut } from "next-auth/react";
import styled from "styled-components";
import useSWR from "swr";
import Image from "next/image";
import Portrait_Placeholder from "@/public/Portrait_Placeholder.png";

export default function ProfilePage() {
  const { data: session } = useSession();
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
  } = useSWR(session ? "/api/user" : null);

  if (userError)
    return <ListHeader>Nutzerdaten konnten nicht geladen werden.</ListHeader>;
  if (userIsLoading)
    return <ListHeader>Nutzerdaten werden geladen...</ListHeader>;

  if (session && userData) {
    return (
      <>
        <UserContainer>
          <UserImage
            src={
              session?.user.image ? session.user.image : Portrait_Placeholder
            }
            alt={session.user.name}
            width={300}
            height={300}
          />
          <span>Nutzername: {session.user.name}</span>
          <span>favorisierte Episoden: {userData.favorites.length}</span>
        </UserContainer>

        <LogButton
          type="button"
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          <SVGIcon variant="spotify" width="40px" />
          Logout
        </LogButton>
      </>
    );
  }
}

const UserContainer = styled.section`
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  margin: 0.8rem 0;
  padding: 1.2rem;
  text-align: center;
  background-color: var(--background-tiles);
  color: var(--text);
  border: 3px solid var(--background-secondary);
  border-radius: 10px;
`;

const UserImage = styled(Image)`
  width: 80%;
  max-width: 300px;
  height: auto;
  align-self: center;
  margin: 1rem;
`;
