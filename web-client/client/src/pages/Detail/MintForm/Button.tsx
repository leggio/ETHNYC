import styled from 'styled-components';

export const Button = styled.button`
  font-family: 'nowaymedium';
  margin-top: 1.5em;
  font-size: 1rem;
  padding: 0.5em 0em;
  width: 100%;
  border-radius: 0.15em;
  border-color: ${({ theme }) => theme.colors.primaryDark};
  border: 1px solid;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 2.5em;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.hover};
    border-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.primaryLight};
    border-color: ${({ theme }) => theme.colors.primaryDark};
    opacity: 0.55;
  }
`;
