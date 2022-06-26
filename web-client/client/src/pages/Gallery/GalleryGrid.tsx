import styled from 'styled-components';

const GalleryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  /* width: min-content; */
  /* width: min-content; */
  /* background-color: pink; */
  gap: 1rem;
  /* padding-bottom: 5rem; */

  /* ${({ theme: { media } }) => media.tablet`
    max-width: 930px;
    flex-direction: row;
  `} */
`;

export default GalleryGrid;
