import React from 'react';
import styled from 'styled-components';
import NavLink, { BlogLink } from './NavLink';

const Menu = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  position: absolute;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  height: 100vh;
  width: 300px;
  text-align: left;

  transform: scale(0, 1);
  transform-origin: left;
  transition: transform 150ms ease-in-out;

  ${({ theme: { media } }) => media.tablet`
    position: unset;
    background-color: unset;
    height: unset;
    width: unset;
    text-align: unset;
    transform: unset;
    transform-origin: unset;
    transition: unset;

    grid-column: 2 / 3;
    justify-self: end;
    display: flex;
    align-items: center;
  `}
`;

const MenuItem = styled.li`
  margin-top: 1em;
  margin-left: 1em;

  ${({ theme: { media } }) => media.tablet`
    margin-top: 0em;
    margin-left: 3em;
  `}
`;

const dismiss = () => {
  const checkBox = document.getElementById('toggle') as HTMLInputElement;
  checkBox.checked = false;
};

const MenuBar = () => (
  <Menu>
    <MenuItem onClick={dismiss}>
      <NavLink to="/">Home</NavLink>
    </MenuItem>
    <MenuItem onClick={dismiss}>
      <NavLink to="/create">Create</NavLink>
    </MenuItem>
  </Menu>
);

export default MenuBar;
