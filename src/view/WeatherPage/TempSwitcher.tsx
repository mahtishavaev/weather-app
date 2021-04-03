import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getTempUnit, setTempUnit } from "../../redux/weatherSlice";

const Inner = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  @media (max-width: 767.98px) {
    margin-top: 40px;
  }
`;

const Button = styled.div<{ active: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 700;
  font-size: 18px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => (props.active ? "#E7E7EB" : "#585676")};
  color: ${(props) => (props.active ? "#110E3C" : "#E7E7EB")};
  & + & {
    margin-left: 10px;
  }
`;

export const TempSwitcher: FC = () => {
  const tempUnit = useSelector(getTempUnit);
  const dispatch = useDispatch();

  return (
    <Inner>
      <Button active={tempUnit === "°C"} onClick={() => dispatch(setTempUnit("°C"))}>
        °C
      </Button>
      <Button active={tempUnit === "°F"} onClick={() => dispatch(setTempUnit("°F"))}>
        °F
      </Button>
    </Inner>
  );
};
