import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  fetchWeather,
  getCurrentWeather,
  getForecastWeather,
  getRequestError,
  getRequestStatus,
  getTempUnit,
} from "../../redux/weatherSlice";
import { Aside } from "../Aside/Aside";
import { Footer } from "../Footer/Footer";
import { Main } from "../Main/Main";
import { AsideContent } from "./AsideContent";
import { ForecastCard } from "./ForecatsCard";
import { TempSwitcher } from "./TempSwitcher";
import { Highlight } from "./Highlight";
import { Preloader } from "../Preloader/Preloader";
import { ErrorBlock } from "../ErrorBlock/ErrorBlock";

const Container = styled.div`
  max-width: 768px;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1199.98px) {
    max-width: 576px;
  }

  @media (max-width: 991.98px) {
    max-width: 360px;
  }

  @media (max-width: 767.98px) {
    max-width: 576px;
  }

  @media (max-width: 575.98px) {
  }
`;

const ForecastWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  margin-left: -10px;
  margin-right: -10px;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 24px;
  color: #e7e7eb;
  margin-top: 40px;
`;

const Highlights = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: -10px;
  margin-right: -10px;
`;

export const WeatherPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const forecast = useSelector(getForecastWeather);
  const currentWeather = useSelector(getCurrentWeather);
  const tempUnit = useSelector(getTempUnit);
  const status = useSelector(getRequestStatus);
  const error = useSelector(getRequestError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeather(id));
  }, [id, dispatch]);

  return (
    <>
      {status === "loading" && <Preloader />}
      {status === "failed" && <ErrorBlock>{error}</ErrorBlock>}
      {status === "succeeded" && (
        <>
          <Aside>
            <AsideContent />
          </Aside>
          <Main>
            <Container>
              <TempSwitcher />
              <ForecastWrapper>
                {forecast?.map((el) => (
                  <ForecastCard
                    key={el.date}
                    date={el.date}
                    icon={el.icon}
                    tempMax={(tempUnit === "°C" ? el.tempMaxC : el.tempMaxF) + tempUnit}
                    tempMin={(tempUnit === "°C" ? el.tempMinC : el.tempMinF) + tempUnit}
                  />
                ))}
              </ForecastWrapper>
              <Title>Today’s Hightlights</Title>
              {currentWeather && (
                <Highlights>
                  <Highlight title="Wind status" unit="mph" value={currentWeather.windSpeed} />
                  <Highlight title="Humidity" unit="%" value={currentWeather.humidity} />
                  <Highlight title="Visibility" unit="km" value={currentWeather.visibility} />
                  <Highlight title="Air Pressure" unit="mb" value={currentWeather.pressure} />
                </Highlights>
              )}
            </Container>
            <Footer />
          </Main>
        </>
      )}
    </>
  );
};
