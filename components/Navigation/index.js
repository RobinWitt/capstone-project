import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import SVGIcon from "../Icons";

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 700px;
  padding: 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #053d38;
`;

export default function Navigation() {
  const router = useRouter();
  const currentPage = router.pathname;

  return (
    <StyledNav>
      <Link href="/startseite" aria-label="Startseite">
        <SVGIcon
          variant={currentPage === "/startseite" ? "homeFilled" : "homeEmpty"}
          width="50px"
          color="#A3CCAB"
        />
      </Link>
      <Link href="/favoriten" aria-label="Favoritenseite">
        <SVGIcon
          variant={
            currentPage === "/favoriten" ? "favoriteFilled" : "favoriteEmpty"
          }
          width="50px"
          color="#A3CCAB"
        />
      </Link>
    </StyledNav>
  );
}
