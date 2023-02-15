import { useSession } from "next-auth/react";
import styled from "styled-components";
import Image from "next/image";
import Portrait_Placeholder from "@/public/Portrait_Placeholder.png";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <StyledHeader>
      <AppHeader>D1E DR3I ???</AppHeader>
      <Link
        href={session ? "/profil" : "/"}
        aria-label={session ? "Profilseite" : "Login"}
      >
        <HeaderImage
          src={session.user.image ? session.user.image : Portrait_Placeholder}
          alt="user image"
          width={100}
          height={100}
        />
      </Link>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  max-width: 700px;
  height: 70px;
  padding: 0 0.7rem;
  margin: auto;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--background);
  color: var(--secondary);
`;

const AppHeader = styled.h1`
  margin-left: 1rem;
`;

const HeaderImage = styled(Image)`
  height: 48px;
  width: 48px;
  object-fit: cover;
  align-self: center;
  border-radius: 50%;
`;
