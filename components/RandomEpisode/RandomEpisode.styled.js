import styled from "styled-components";
import Link from "next/link";

export const RandomEpisodeList = styled.ul`
  list-style: none;
  margin: 0.2rem;
`;

export const RandomEpisodeListItem = styled.li`
  display: flex;
  align-items: center;
  background-color: lightgrey;
  margin: 0.5rem;
`;

export const RandomEpisodeLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.2rem 1rem 0.2rem 4rem;
  text-decoration: none;
  color: darkgreen;
`;
