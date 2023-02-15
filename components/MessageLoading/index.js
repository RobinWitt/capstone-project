import { useRouter } from "next/router";
import styled from "styled-components";
import SVGIcon from "../Icons";

export default function MessageLoading() {
  return (
    <Container>
      <Headline>wird geladen...</Headline>
      <IconContainer>
        <SVGIcon variant="refresh" width="80px" />
      </IconContainer>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  text-align: center;
  color: var(--primary);
`;

const Headline = styled.h2`
  margin: 1rem;
`;

const IconContainer = styled.div`
  animation: loading-spinner 2200ms linear infinite;

  @keyframes loading-spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
