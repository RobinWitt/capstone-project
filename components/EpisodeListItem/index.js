import Link from "next/link";
import styled from "styled-components";

const StyledListItem = styled.li`
  background-color: whitesmoke;
  margin: 0.5rem;
`;

const StyledEpisodeLink = styled(Link)`
  display: flex;
  padding: 0.5rem;
  width: 100%;
  border: 2px solid;
  border-radius: 5px;
  text-decoration: none;
  color: darkgreen;
`;

export default function EpisodeListItem({ nummer, titel, href }) {
  return (
    <StyledListItem>
      <StyledEpisodeLink href={href}>
        <p>
          #{nummer} ...{titel}
        </p>
      </StyledEpisodeLink>
    </StyledListItem>
  );
}
