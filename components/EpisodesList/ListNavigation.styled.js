import { css } from "styled-components";
import styled from "styled-components";

export const ListOptions = styled.section`
  display: flex;
  gap: 3px;
`;

export const ListOptionsButton = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  border: none;
  border-radius: 999px;
  background: var(--primary);
  color: var(--background);
  padding: 0.4rem;
  font-size: 1rem;

  ${({ variant, active }) => {
    if (variant === "text")
      return css`
        ${active && `background-color: var(--secondary)`};
      `;
  }}}
`;
