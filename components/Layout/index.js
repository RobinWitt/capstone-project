import styled from "styled-components";
import { css } from "styled-components";

export const MainLayout = styled.main`
  margin: auto;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ showPlayer }) => {
    return css`
      margin-bottom: ${showPlayer ? "8rem" : "5.5rem"};
    `;
  }}}
`;
