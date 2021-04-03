import { FC } from "react";
import styled from "styled-components";

const Inner = styled.div`
  width: 20%;
  @media (max-width: 1199.98px) {
    width: 33.33%;
  }
  @media (max-width: 991.98px) {
    width: 50%;
  }
  @media (max-width: 767.98px) {
    width: 33.33%;
  }

  @media (max-width: 575.98px) {
    width: 50%;
  }
`;

const Wrapper = styled.div`
  background-color: #1e213a;
  padding: 15px 20px;
  margin: 10px;
`;

const Day = styled.p`
  font-size: 16px;
  text-align: center;
  color: #e7e7eb;
`;

const Icon = styled.img`
  display: block;
  margin: 10px auto;
  width: 80px;
  height: 80px;
`;

const Temp = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
`;

const TempMax = styled.span`
  color: #e7e7eb;
`;
const TempMin = styled.span`
  color: #a09fb1;
`;

type PropsType = {
  date: string;
  icon: string;
  tempMin: string;
  tempMax: string;
};

export const ForecastCard: FC<PropsType> = ({ date, icon, tempMin, tempMax }) => {
  return (
    <Inner>
      <Wrapper>
        <Day>{date}</Day>
        <Icon src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
        <Temp>
          <TempMax>{tempMax}</TempMax>
          <TempMin>{tempMin}</TempMin>
        </Temp>
      </Wrapper>
    </Inner>
  );
};
