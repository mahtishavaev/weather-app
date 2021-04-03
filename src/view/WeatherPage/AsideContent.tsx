import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LocIcon } from "../../assets/icons/location.svg";
import { getCurrentWeather, getLocationName, getTempUnit } from "../../redux/weatherSlice";

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Search = styled.div`
  margin: 30px;
  align-self: flex-start;
`;

const SearchBtn = styled(Link)`
  padding: 10px 16px;
  text-decoration: none;
  background: #6e707a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: 500;
  font-size: 16px;
  color: #e7e7eb;
`;

const WeatherIcon = styled.img`
  width: 200px;
  height: 200px;
  margin-top: 30px;
`;

const Temperature = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-top: 40px;
  font-size: 96px;
  color: #e7e7eb;
`;

const TempUnit = styled.span`
  font-size: 48px;
  color: #6e707a;
  margin-bottom: 15px;
  margin-left: 5px;
`;

const Description = styled.p`
  font-weight: 500;
  font-size: 36px;
  text-align: center;
  text-transform: capitalize;
  color: #a09fb1;
  margin-top: 50px;
`;

const Today = styled.div`
  text-align: center;
  margin-top: 50px;
  margin-bottom: 30px;
  font-weight: 500;
  font-size: 18px;
  color: #88869d;
`;

const Location = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-weight: 600;
  font-size: 18px;
  color: #88869d;
`;

const LocationIcon = styled(LocIcon)`
  width: 20px;
  height: 20px;
  fill: #88869d;
  margin-right: 10px;
`;

export const AsideContent = () => {
  const currentWeather = useSelector(getCurrentWeather);
  const locationName = useSelector(getLocationName);
  const tempUnit = useSelector(getTempUnit);

  return (
    <Inner>
      <Search>
        <SearchBtn to="/">Seach for places</SearchBtn>
      </Search>
      <WeatherIcon src={`http://openweathermap.org/img/wn/${currentWeather?.icon}@4x.png`} />
      <Temperature>
        {tempUnit === "°C" ? currentWeather?.tempC : currentWeather?.tempF}
        <TempUnit>{tempUnit}</TempUnit>
      </Temperature>
      <Description>{currentWeather?.desc}</Description>
      <Today>Today • {currentWeather?.date}</Today>
      <Location>
        <LocationIcon />
        {locationName}
      </Location>
    </Inner>
  );
};
