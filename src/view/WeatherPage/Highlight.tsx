import { FC } from "react";
import styled from "styled-components";

const Inner = styled.div`
  width: 50%;
  @media (max-width: 1199.98px) {
  }
  @media (max-width: 991.98px) {
    width: 100%;
  }
  @media (max-width: 767.98px) {
    width: 50%;
  }
  @media (max-width: 575.98px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  padding: 20px;
  margin: 10px;
  background: #1e213a;
  text-align: center;
`;

const Title = styled.p`
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: #e7e7eb;
`;

const Value = styled.p`
  font-weight: bold;
  font-size: 64px;
  color: #e7e7eb;
  margin-top: 10px;
  span {
    font-weight: 400;
    font-size: 36px;
  }
`;

type PropsType = {
  title: string;
  value: number;
  unit: string;
};

export const Highlight: FC<PropsType> = ({ title, value, unit }) => {
  return (
    <Inner>
      <Wrapper>
        <Title>{title}</Title>
        <Value>
          {value}
          <span>{unit}</span>
        </Value>
      </Wrapper>
    </Inner>
  );
};
