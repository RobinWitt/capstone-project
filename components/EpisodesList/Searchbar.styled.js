import { css } from "styled-components";
import styled from "styled-components";

export const SearchbarForm = styled.form`
  display: flex;
  align-items: center;
  gap: 3px;
  background-color: var(--secondary);
  padding: 0.4rem;
  border-radius: 999px;
  width: 60%;
  max-width: 300px;
  transition: width 0.5s;

  ${({ showSearchbar }) => {
    if (showSearchbar === false) {
      return css`
        width: 2.4rem;
        background-color: var(--primary);
      `;
    }
  }}
`;

export const SearchbarInput = styled.input`
  background-color: var(--text);
  border: none;
  width: 100%;
  line-height: 1;
  padding: 0.2rem;

  ${({ showSearchbar }) => {
    if (showSearchbar === false) {
      return css`
        display: none;
      `;
    }
  }}
`;

export const SearchbarButton = styled.button`
  border-radius: 999px;
  border: none;
  background-color: transparent;
  display: flex;

  ${({ variant, showSearchbar }) => {
    if (variant === "close" && !showSearchbar) {
      return css`
        display: none;
      `;
    }
  }}
`;
