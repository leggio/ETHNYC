import { Field } from 'formik';
import styled from 'styled-components';

export const Label = styled.label`
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const Error = styled.div`
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.error};
`;

export const StyledField = styled(Field)`
  display: block;
  height: 2em;
  width: 100%;
  background-color: transparent;
  border-style: hidden hidden solid hidden;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primaryDark};
  border-radius: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 0.35em;

  &:focus {
    outline: none;
  }

  ::placeholder {
    font-family: 'nowaythin';
    color: ${({ theme }) => theme.colors.primaryDark};
    opacity: 0.5;
  }
`;
