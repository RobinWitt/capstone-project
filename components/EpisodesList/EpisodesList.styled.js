import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export const OverviewList = styled.ul`
  list-style: none;
  margin: 1rem;
`;

export const OverviewListItem = styled.li`
  border: 2px solid;
  border-radius: 0.7rem;
  background-color: lightgrey;
  margin: 0.5rem;
`;

export const OverviewCard = styled.section`
  display: flex;
  align-items: center;
`;

export const EpisodeLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem;
  text-decoration: none;
  color: darkgreen;
`;

export const FavButton = styled.button`
  border: none;
  border-left: 2px solid;
  padding: 0.5rem;
  background: none;
  color: darkgreen;
  cursor: pointer;
`;

export const Preview = styled.div`
  position: relative;
  border-top: 2px solid;
`;

export const PreviewImage = styled(Image)`
  width: 40%;
  height: auto;
  margin: 0.5rem;
  border-radius: 0.3rem;
`;

export const PreviewDate = styled.p`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  font-size: 1.2rem;
`;
