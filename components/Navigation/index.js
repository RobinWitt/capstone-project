import Link from "next/link";
import styled from "styled-components";
import SVGIcon from "../Icons";
import { useRouter } from "next/router";

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: pink;
  border-top: 2px solid;
`;

export default function Navigation() {
  const router = useRouter();
  const currentPage = router.pathname;

  return (
    <StyledNav>
      <Link href="/">
        <SVGIcon
          variant={currentPage === "/" ? "homeFilled" : "homeEmpty"}
          width="50px"
          color="darkgreen"
        />
      </Link>
      <Link href="/favorites">
        <SVGIcon
          variant={
            currentPage === "/favorites" ? "favoriteFilled" : "favoriteEmpty"
          }
          width="50px"
          color="darkgreen"
        />
      </Link>
    </StyledNav>
  );
}
