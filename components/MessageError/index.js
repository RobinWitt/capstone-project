import { useRouter } from "next/router";
import styled from "styled-components";
import SVGIcon from "../Icons";

export default function MessageError() {
  const router = useRouter();

  return (
    <MessageContainer>
      <MessageHeadline>Fehler beim Laden</MessageHeadline>
      <MessageButton onClick={router.reload}>
        <SVGIcon variant="refresh" width="80px" />
        <MessageText>Neu laden</MessageText>
      </MessageButton>
    </MessageContainer>
  );
}

const MessageContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  text-align: center;
  color: var(--primary);
`;

const MessageHeadline = styled.h2`
  margin: 1rem;
`;

const MessageText = styled.span`
  color: var(--primary);
`;

const MessageButton = styled.button`
  border: none;
  background-color: transparent;
  color: var(--accent);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
