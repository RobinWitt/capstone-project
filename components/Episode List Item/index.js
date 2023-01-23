import styled from "styled-components";

const StyledListItem = styled.li`
  background-color: whitesmoke;
  border: 1px solid;
`;

export default function EpisodeListItem({ children }) {
  return (
    <StyledListItem>
      <p>{children}</p>
    </StyledListItem>
  );
}
