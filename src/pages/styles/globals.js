import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    
    --font-sans: Arial, Helvetica, sans-serif;
    --font-mono: 'Courier New', Courier, monospace;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      //--background: #0a0a0a;
      --foreground:#333;
    }
  }

  body {
    //background: var(--background);
    color: var(--foreground);
    font-family: var(--font-sans);
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    min-height: 100%;
  }
`;

export default GlobalStyle;
