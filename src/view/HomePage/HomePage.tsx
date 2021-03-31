import { FC } from "react";
import styled from "styled-components";
import { Footer } from "../Footer/Footer";
import { Search } from "./Search";
import { WorldMap } from "./WorldMap";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #100e1d;
`;

export const HomePage: FC = () => {
  return (
    <>
      <Search />
      <Main>
        <WorldMap />
        <Footer />
      </Main>
    </>
  );
};
