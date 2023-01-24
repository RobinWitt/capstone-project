import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 0.5rem;
  border-bottom: 2px dashed;
  font-size: 0.8rem;
`;

export default function Header() {
  return (
    <StyledHeader>
      <h1>Projekt Justus.Peter.Bob.</h1>
    </StyledHeader>
  );
}
