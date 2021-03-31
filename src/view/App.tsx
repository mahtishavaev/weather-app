import styled, { createGlobalStyle } from "styled-components";
import { HomePage } from "./HomePage/HomePage";

const Inner = styled.div`
  display: flex;
  min-height: 100vh;
`;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body{
    background:#FAFAFA;
    font-family: 'Ubuntu', sans-serif;
  }
`;

export function App() {
  return (
    <Inner>
      <GlobalStyle />
      <HomePage />
    </Inner>
  );
}
