import styled from "styled-components";

const StyledHeader = styled.header`
  max-width: 700px;
  padding: 0.5rem;
  margin: auto;
  font-size: 0.8rem;
  background: #053d38;
  color: #a3ccab;
`;

export default function Header() {
  return (
    <StyledHeader>
      <h1>Projekt Justus.Peter.Bob.</h1>
    </StyledHeader>
  );
}
