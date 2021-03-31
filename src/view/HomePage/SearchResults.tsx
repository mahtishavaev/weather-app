import { FC } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowIcon } from "../../assets/icons/right-arrow.svg";

const Inner = styled.div`
  margin-top: 50px;
`;

const ResultWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const Button = styled.div`
  flex: 1;
  position: relative;
  font-weight: 500;
  font-size: 16px;
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
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  fill: transparent;
  ${Button}:hover & {
    fill: #616475;
  }
`;

export const SearchResults: FC = () => {
  return (
    <Inner>
      <ResultWrapper>
        <Button>
          Result
          <RightArrowIcon />
        </Button>
      </ResultWrapper>
      <ResultWrapper>
        <Button>
          Result
          <RightArrowIcon />
        </Button>
      </ResultWrapper>
    </Inner>
  );
};
