import Link from "next/link";
import styled from "styled-components";

const StyledListItem = styled.li`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  background-color: whitesmoke;
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid;
  border-radius: 5px;
`;

export default function EpisodeListItem({ nummer, titel, href }) {
  return (
    <Link href={href}>
      <StyledListItem>
        <p>#{nummer}</p>
        <p>...{titel}</p>
      </StyledListItem>
    </Link>
  );
}
