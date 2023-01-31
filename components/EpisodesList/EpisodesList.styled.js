import styled from "styled-components";
import Link from "next/link";

export const StyledList = styled.ul`
  list-style: none;
  margin: 1rem;
`;

export const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  background-color: lightgrey;
  margin: 0.5rem;
  border: 2px solid;
  border-radius: 5px;
`;

export const StyledEpisodeLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 0.5rem;
  text-decoration: none;
  color: darkgreen;
`;

export const FavButton = styled.button`
  border: none;
  border-left: 2px solid;
  padding: 0.5rem;
  background: none;
  color: darkgreen;
`;
