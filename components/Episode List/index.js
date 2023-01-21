import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
`;

export default function EpisodeList({ children }) {
  return <StyledList>{children}</StyledList>;
}
