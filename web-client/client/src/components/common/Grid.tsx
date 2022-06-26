import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-areas:
    'title'
    'text';
  padding-bottom: 5rem;

  ${({ theme: { media } }) => media.tablet`
    max-width: 930px;
    margin: auto;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "title title ."
      "text text .";
  `}
`;

export default Grid;
