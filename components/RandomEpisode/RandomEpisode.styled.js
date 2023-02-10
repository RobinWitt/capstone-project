import styled from "styled-components";
import Link from "next/link";

export const RandomEpisodeListItem = styled.li`
  display: flex;
  align-items: center;
  margin: 0.5rem;
`;

export const RandomEpisodeLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 0;
  text-decoration: none;
`;

export const RandomEpisodeHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 30px;
  color: var(--secondary);
`;

export const RandomEpisodeNavigation = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
