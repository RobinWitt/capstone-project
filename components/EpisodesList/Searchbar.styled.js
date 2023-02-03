import { css } from "styled-components";
import styled from "styled-components";

export const SearchbarForm = styled.form`
  display: flex;
  align-items: center;
  gap: 3px;
  background-color: grey;
  padding: 0.3rem 0.4rem 0.3rem 0.4rem;
  border-radius: 10rem;
  width: 60%;
  max-width: 300px;
  transition: width 0.5s;

  ${({ showSearchbar }) => {
    if (showSearchbar === false) {
      return css`
        width: 2rem;
      `;
    }
  }}
`;

export const SearchbarInput = styled.input`
  background-color: lightgrey;
  border: none;
  width: 100%;
  line-height: 1;

  ${({ showSearchbar }) => {
    if (showSearchbar === false) {
      return css`
        display: none;
      `;
    }
  }}

  &:focus {
    outline: 2px solid var(--color-background);
  }
`;

export const SearchbarButton = styled.button`
  border-radius: 999px;
  border: none;
  line-height: 1;
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
