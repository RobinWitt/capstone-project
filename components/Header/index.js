import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 0.5rem;
  font-size: 0.8rem;
  background: lightgrey;
`;

export default function Header() {
  return (
    <StyledHeader>
      <h1>Projekt Justus.Peter.Bob.</h1>
    </StyledHeader>
  );
}
