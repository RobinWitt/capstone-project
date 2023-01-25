import Link from "next/link";
import styled from "styled-components";
import SVGIcon from "../Icons";

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: lightgrey;
  border: 2px solid;
`;

export default function Navigation() {
  return (
    <StyledNav>
      <Link href="/">
        <SVGIcon variant="homeEmpty" width="50px" color="darkgreen" />
      </Link>
    </StyledNav>
  );
}
