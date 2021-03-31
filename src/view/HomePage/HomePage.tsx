import { FC } from "react";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "./SearchForm";
import { WorldMap } from "./WorldMap";
import { Aside } from "../Aside/Aside";
import { Main } from "../Main/Main";
import { SearchResults } from "./SearchResults";

export const HomePage: FC = () => {
  return (
    <>
      <Aside>
        <SearchForm />
        <SearchResults />
      </Aside>
      <Main>
        <WorldMap />
        <Footer />
      </Main>
    </>
  );
};
