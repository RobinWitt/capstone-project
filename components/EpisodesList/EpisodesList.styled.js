import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export const ListHeadContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

export const ListHeader = styled.h2`
  text-align: center;
  margin: 0.8rem 0 0.2rem 0;
`;

export const OverviewList = styled.ul`
  list-style: none;
  width: 95%;
`;

export const OverviewListItem = styled.li`
  display: flex;
  align-items: center;
  background-color: lightgrey;
  margin: 0.5rem;
`;

export const EpisodeLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0.2rem;
  text-decoration: none;
  color: darkgreen;
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
  color: darkgreen;
  cursor: pointer;
`;
