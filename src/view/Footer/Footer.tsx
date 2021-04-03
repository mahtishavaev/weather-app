import { FC } from "react";
import styled from "styled-components";

const Inner = styled.footer`
  text-align: center;
  font-size: 14px;
  color: #a09fb1;
  padding: 15px;
  margin-top: auto;
`;

const Text = styled.p`
  font-weight: 500;
`;

const GithubLink = styled.a`
  font-weight: 700;
  color: #a09fb1;
  margin: 0 5px;
`;

export const Footer: FC = () => {
  return (
    <Inner>
      <Text>
        created by
        <GithubLink target="_blank" href="https://github.com/mahtishavaev">
          mahtishavaev
        </GithubLink>
        - devChallenges.io
      </Text>
    </Inner>
  );
};
