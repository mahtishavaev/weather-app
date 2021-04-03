import { FC } from "react";
import styled from "styled-components";
import { ReactComponent as LoadingIcon } from "../../assets/icons/loading.svg";

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  background-color: rgba(235, 235, 235, 0.9);
`;

const Icon = styled(LoadingIcon)`
  width: 150px;
  height: 150px;
`;

export const Preloader: FC = () => {
  return (
    <Inner>
      <Icon />
    </Inner>
  );
};
