import React from 'react';
import styled from 'styled-components';

import StyledNavLink, { BlogLink } from './NavLink';
import MenuBar from './MenuBar';
import Logo from './Logo';

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  position: fixed;
  width: 100vw;
  opacity: 0.95;

  z-index: 100;
`;

const Nav = styled.nav`
  ${({ theme: { media } }) => media.tablet`
    max-width: 930px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 2fr;
  `}
`;

const MenuIcon = styled.label`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 1em;
  display: flex;
  height: 100%;
  align-items: center;

  > span,
  span::before,
  span::after {
    display: block;
    position: relative;
    background-color: ${({ theme }) => theme.colors.primaryLight};
    height: 2px;
    width: 1.3em;

    transition: transform 200ms cubic-bezier(0.25, 0.1, 0.28, 1.5);
  }

  > span::before {
    content: '';
    position: absolute;
    bottom: 6px;
  }

  > span::after {
    content: '';
    position: absolute;
    top: 6px;
  }

  ${({ theme: { media } }) => media.tablet`
    display: none;
  `}
`;

const Toggle = styled.input`
  display: none;

  &:checked ~ label > span {
    transform: rotate(45deg);
  }

  &:checked ~ label > span::before {
    transform: rotate(-90deg) translate(-6px);
  }

  &:checked ~ label > span::after {
    transform: rotate(-90deg) translate(6px);
  }

  &:checked ~ ul {
    transform: scale(1, 1);
  }

  &:checked ~ ul ${StyledNavLink} {
    opacity: 1;
    transition: opacity 150ms ease-in-out 150ms;
  }

  &:checked ~ ul ${BlogLink} {
    opacity: 1;
    transition: opacity 150ms ease-in-out 150ms;
  }
`;

const Navigation = () => (
  <Header>
    <Nav>
      <Logo height="35" width="35" />
      <Toggle type="checkbox" id="toggle" />
      <MenuIcon htmlFor="toggle">
        <span></span>
      </MenuIcon>
      <MenuBar />
    </Nav>
  </Header>
);

export default Navigation;
