import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { HomePage } from "./HomePage/HomePage";
import { WeatherPage } from "./WeatherPage/WeatherPage";

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
    font-family: 'Roboto', sans-serif;
  }
`;

export function App() {
  return (
    <BrowserRouter>
      <Inner>
        <GlobalStyle />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/weather">
            <WeatherPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Inner>
    </BrowserRouter>
  );
}
