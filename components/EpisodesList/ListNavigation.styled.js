import { css } from "styled-components";
import styled from "styled-components";

export const ListOptions = styled.section`
  display: flex;
`;

export const ListOptionsButton = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  border: none;
  border-radius: 999px;
  background: grey;
  padding: 0.4rem;
  font-size: 1rem;

  ${({ variant, active }) => {
    if (variant === "text")
      return css`
        background: lightgrey;
        ${active && `background-color: grey`};
      `;
  }}}
`;
