import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ReactComponent as ArrowIcon } from "../../assets/icons/right-arrow.svg";
import { ReactComponent as PointIcon } from "../../assets/icons/geo-point.svg";
import { getLocations, setCurrentLocation } from "../../redux/locationsSlice";
import { Link } from "react-router-dom";

const Inner = styled.div`
  margin-top: 50px;
  overflow-y: scroll;
  max-height: 500px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Location = styled(Link)`
  flex: 1;
  position: relative;
  font-weight: 500;
  font-size: 16px;
  text-decoration: none;
  color: #e7e7eb;
  border: 1px solid transparent;
  padding: 18px 40px 18px 12px;
  cursor: pointer;
  &:hover {
    border: 1px solid #616475;
  }
`;

const RightArrowIcon = styled(ArrowIcon)`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  fill: transparent;
  ${Location}:hover & {
    fill: #616475;
  }
`;

const GeoPoint = styled(PointIcon)`
  width: 28px;
  height: 28px;
  padding: 5px;
  margin-left: 10px;
  fill: #e7e7eb;
  background-color: #6e707a;
  border-radius: 50%;
  cursor: pointer;
`;

export const SearchResults: FC = () => {
  const locations = useSelector(getLocations);
  const dispatch = useDispatch();

  return (
    <Inner>
      {locations.map((el) => (
        <ResultWrapper key={el.geoname_id}>
          <Location to={`weather?lat=${el.latitude}&lon=${el.longitude}`}>
            {el.name}, {el.country}
            <RightArrowIcon />
          </Location>
          <GeoPoint onClick={() => dispatch(setCurrentLocation(el))} />
        </ResultWrapper>
      ))}
    </Inner>
  );
};
