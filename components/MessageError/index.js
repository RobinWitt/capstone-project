import { useRouter } from "next/router";
import styled from "styled-components";
import SVGIcon from "../Icons";

export default function MessageError() {
  const router = useRouter();

  return (
    <Container>
      <Headline>Fehler beim Laden</Headline>
      <Button type="button" onClick={router.reload}>
        <SVGIcon variant="refresh" width="80px" />
        <Text>Neu laden</Text>
      </Button>
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

const Text = styled.span`
  color: var(--primary);
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: var(--accent);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
