import React from 'react';
import styled from 'styled-components';

interface Props {
  readonly width: string;
  readonly height: string;
}

const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  ${({ theme: { media } }) => media.tablet`
    grid-column: 1 / 2;
    margin: 0;
    justify-self: start;
  `}
`;

const Svg = styled.svg`
  display: block;
  margin: auto;
`;

const Name = styled.h3`
  display: none;

  ${({ theme }) => theme.media.tablet`
    display: block;
    font-family: "nowaythin";
    color: ${theme.colors.primaryLight};
    margin: 0 0 0 0.25em;
  `}
`;

const Logo = (props: Props) => (
  <LogoContainer>
    <Svg viewBox="0 0 200 200" {...props}>
      <path
        d="M50 50h27.64c7.58 0 14.5 4.28 17.89 11.06l31.71 63.42a9.996 9.996 0 008.94 5.53H150v20h-17.64c-7.58 0-14.5-4.28-17.89-11.06L82.76 75.53A9.985 9.985 0 0073.82 70H50V50z"
        fill="#f3f6f1"
      />
      <path opacity={0.65} fill="#f3f6f1" d="M85 90l10 20-26.67 40H45z" />
    </Svg>
    <Name>chainality</Name>
  </LogoContainer>
);

export default Logo;
