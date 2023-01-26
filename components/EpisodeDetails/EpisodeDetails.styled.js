import styled from "styled-components";
import Image from "next/image";

export const EpisodeDetailsArticle = styled.article`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  margin: 1rem;
  padding: 1rem;
  border: 2px solid;
  border-radius: 10px;
`;

export const EpisodeImage = styled(Image)`
  width: 100%;
  height: auto;
  align-self: center;
  margin: 1rem;
`;

export const EpisodeFacts = styled.p`
  margin-top: 0.5rem;
`;

export const NoContentMessage = styled.p`
  margin-top: 0.8rem;
  color: lightgrey;
`;
