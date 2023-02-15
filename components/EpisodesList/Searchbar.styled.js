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
  transition: width 0.7s;

  ${({ showSearchbar }) => {
    if (showSearchbar === false) {
      return css`
        width: 39px;
        background-color: var(--primary);
      `;
    }
  }}
`;

export const SearchbarInput = styled.input`
  background: var(--primary);
  color: var(--background);
  border: none;
  outline: none;
  width: 100%;
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
