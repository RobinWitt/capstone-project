import Link from "next/link";
import styled from "styled-components";

const StyledListItem = styled.li`
  background-color: whitesmoke;
  margin: 0.5rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid;
  border-radius: 5px;
`;

export default function EpisodeListItem({ nummer, titel, href }) {
  return (
    <StyledListItem>
      <StyledLink href={href}>
        <p>#{nummer}</p>
        <p>...{titel}</p>
      </StyledLink>
    </StyledListItem>
  );
}
