import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.primaryLight};
  font-family: 'nowaythin';
  text-decoration: none;
  opacity: 0;
  transition: opacity 100ms ease-in-out;

  &.active {
    font-weight: bold;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.hover};
  }

  ${({ theme: { media } }) => media.tablet`
    opacity: 1;
  `}
`;

export const BlogLink = styled.a`
  color: ${({ theme }) => theme.colors.primaryLight};
  font-family: 'nowaythin';
  text-decoration: none;
  opacity: 0;
  transition: opacity 100ms ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.hover};
  }

  ${({ theme: { media } }) => media.tablet`
    opacity: 1;
  `}
`;

export default StyledNavLink;
