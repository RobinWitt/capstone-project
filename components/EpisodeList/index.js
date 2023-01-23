import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  margin: 1rem;
`;

export default function EpisodeList({ children }) {
  return <StyledList>{children}</StyledList>;
}
