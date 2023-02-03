import styled from "styled-components";
import Image from "next/image";

export const StyledEpisodeCard = styled.article`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  margin: 0.8rem;
  padding: 1.2rem;
  border: 2px solid;
`;

export const EpisodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
`;

export const EpisodeNavButton = styled.button`
  border: none;
  background: none;
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
  color: grey;
`;

export const StyledFoldButton = styled.button`
  font-size: 1.2rem;
  margin-top: 0.8rem;
  color: darkgreen;
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
