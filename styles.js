import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: system-ui;
  }

  main {
    margin: auto;
    margin-bottom: 5rem;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }


`;
