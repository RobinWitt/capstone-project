import styled from "styled-components";
import Image from "next/image";

export const StyledEpisodeCard = styled.article`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0.8rem 0;
  padding: 1.2rem;
  background-color: var(--background-tiles);
  color: var(--text);
  border: 3px solid var(--background-secondary);
`;

export const EpisodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  color: var(--secondary);
`;

export const EpisodeNavButton = styled.button`
  border: none;
  background-color: transparent;
  color: var(--primary);
`;

export const EpisodeImage = styled(Image)`
  width: 100%;
  height: auto;
  align-self: center;
  margin: 1rem;
`;

export const PartsHeader = styled.h3`
  align-self: center;
  margin-top: 0.5rem;
`;

export const EpisodeFacts = styled.p`
  margin-top: 0.5rem;
`;

export const NoContentMessage = styled.p`
  margin-top: 0.8rem;
  color: var(--secondary);
`;

export const StyledFoldButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  margin-top: 0.8rem;
  padding-left: 1rem;
  border: none;
  background-color: var(--primary);
  color: var(--background-secondary);
`;

export const DescriptionText = styled.p`
  margin: 0.5rem;
`;

export const ChaptersList = styled.ol`
  list-style: decimal;
  margin: 0.5rem;
  margin-left: 1.5rem;
`;

export const ListOfSpeakers = styled.ol`
  list-style: square;
  margin: 0.5rem;
  margin-left: 1.5rem;
`;

export const ItemOfSpeaker = styled.li`
  margin-bottom: 0.5rem;
`;
