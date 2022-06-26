import styled from 'styled-components';

export const TitleArea = styled.div`
  grid-area: title;
`;

export const TextArea = styled.div`
  grid-area: text;
  color: ${({ theme }) => theme.colors.primaryDark};
`;
