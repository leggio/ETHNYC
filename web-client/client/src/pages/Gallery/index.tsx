import React from 'react';
import styled from 'styled-components';

import GalleryGrid from './GalleryGrid';
import Item from './Item';
import Background from '../../components/common/Background';

const Center = styled.div`
  margin: auto;
  max-width: 930px;
`;

const Gallery: React.FC = () => {
  return (
    <Background>
      <Center>
        <GalleryGrid>
          <Item id="3s" />
          <Item id="3s" />
          <Item id="3s" />
          <Item id="3s" />
          <Item id="3s" />
          <Item id="3s" />
          <Item id="3s" />
          <Item id="3s" />
          <Item id="3s" />
          <Item id="3s" />
          <Item id="3s" />
          <Item id="3s" />
          <Item id="3s" />
          <Item id="3s" />
          <Item id="3s" />
        </GalleryGrid>
      </Center>
    </Background>
  );
};

export default Gallery;
