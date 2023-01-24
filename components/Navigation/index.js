import Link from "next/link";
import styled from "styled-components";
import { HomeIconEmpty } from "../Icons/HomeIcon";

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
        <HomeIconEmpty />
      </Link>
    </StyledNav>
  );
}
