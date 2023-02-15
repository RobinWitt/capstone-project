import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export const ListHeadContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  margin: 0.3rem 0;
  gap: 3px;
`;

export const ListHeader = styled.h2`
  text-align: center;
  margin-bottom: 0.2rem;
  margin-top: 1rem;
  color: var(--text);
`;

export const OverviewList = styled.ul`
  list-style: none;
  width: 95%;
`;

export const OverviewListItem = styled.li`
  display: flex;
  align-items: center;
  margin: 0.5rem;
  background-color: var(--background-tiles);
`;

export const EpisodeLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0.2rem;
  text-decoration: none;
`;

export const PreviewImage = styled(Image)`
  width: auto;
  height: 50px;
`;

export const OverviewText = styled.section`
  margin-left: 1rem;
`;

export const ListButton = styled.button`
  border: none;
  padding: 0 1rem;
  background: none;
  cursor: pointer;
  color: var(--primary);
`;

export const ListEpisodeDate = styled.p`
  color: var(--primary);
  opacity: 0.3;
`;

export const LastPlayedButton = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  margin: 0.2rem;
  text-decoration: none;
  border-radius: 0;
  background: none;
  border: none;
  color: var(--primary);
  font-size: 1rem;
`;
