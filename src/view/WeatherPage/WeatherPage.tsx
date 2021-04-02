import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "../../hooks/useQuery";
import { fetchWeather } from "../../redux/weatherSlice";
import { Aside } from "../Aside/Aside";
import { Footer } from "../Footer/Footer";
import { Main } from "../Main/Main";

export const WeatherPage: FC = () => {
  const query = useQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    const lat = query.get("lat");
    const lon = query.get("lon");
    if (lat !== null && lon !== null) dispatch(fetchWeather(lat, lon));
  }, [query, dispatch]);
  return (
    <>
      <Aside></Aside>
      <Main>
        <Footer />
      </Main>
    </>
  );
};
