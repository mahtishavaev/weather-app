import React, { FC, useEffect } from "react";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "./SearchForm";
import { WorldMap } from "./WorldMap";
import { Aside } from "../Aside/Aside";
import { Main } from "../Main/Main";
import { SearchResults } from "./SearchResults";
import { useDispatch, useSelector } from "react-redux";
import { getRequestStatus, setCurrentLocation } from "../../redux/locationsSlice";
import { Preloader } from "../Preloader/Preloader";

export const HomePage: FC = () => {
  const status = useSelector(getRequestStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentLocation(null));
  }, [dispatch]);
  return (
    <>
      {status === "loading" && <Preloader />}
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
