import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import SVGIcon from "../Icons";
import { useSession } from "next-auth/react";

export default function Navigation() {
  const router = useRouter();
  const { data: session } = useSession();
  const currentPage = router.pathname;

  if (session)
    return (
      <StyledNav>
        <Link href="/startseite" aria-label="Startseite">
          <SVGIcon
            variant={currentPage === "/startseite" ? "homeFilled" : "homeEmpty"}
            width="40px"
            color="#A3CCAB"
          />
        </Link>
        <Link href="/favoriten" aria-label="Favoritenseite">
          <SVGIcon
            variant={
              currentPage === "/favoriten" ? "favoriteFilled" : "favoriteEmpty"
            }
            width="40px"
            color="#A3CCAB"
          />
        </Link>
      </StyledNav>
    );
}

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 700px;
  height: 60px;
  padding: 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #053d38;
`;
