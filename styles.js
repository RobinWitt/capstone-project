import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root {
  --background: rgba(0, 0, 0, 0.89);
  --background-secondary: rgba(5, 61, 56, 1);
  --background-tiles: rgba(34, 45, 37, 0.85);
  --secondary: rgba(52, 103, 92, 1);
  --primary: rgba(163, 204, 171, 1);
  --text: rgba(224, 238, 224, 1);
  --accent: rgba(242, 104, 0, 1);
}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: system-ui;
    background-color: var(--background) ;
    color: var(--secondary);
  }

  a {
    color: var(--primary)
  }


`;
