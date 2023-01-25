import Link from "next/link";
import styled from "styled-components";
import SVGIcon from "../Icons";

const StyledListItem = styled.li`
  background-color: whitesmoke;
  margin: 0.5rem;
`;

const StyledEpisodeLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  width: 100%;
  border: 2px solid;
  border-radius: 5px;
  text-decoration: none;
  color: darkgreen;
`;

export default function EpisodeListItem({ number, title, href, isFaved }) {
  return (
    <StyledListItem>
      <StyledEpisodeLink href={href}>
        <p>
          #{number} ...{title}
        </p>
        <SVGIcon
          variant={isFaved ? "favoriteFilled" : "favoriteEmpty"}
          width="20px"
        />
      </StyledEpisodeLink>
    </StyledListItem>
  );
}
