import React, { useEffect } from 'react';
import styled from 'styled-components';

import GalleryGrid from './GalleryGrid';
import Item from './Item';
import Background from '../../components/common/Background';

import { getAllSoftware } from './../../state/getAllSoftware';

const Center = styled.div`
  margin: auto;
  max-width: 930px;
`;

interface Props {
  address: string;
  royaltyContractInstance: any;
}

const Gallery: React.FC<Props> = ({ address, royaltyContractInstance }) => {
  console.log(address);
  console.log(royaltyContractInstance);
  useEffect(() => {
    let allSoftware = getAllSoftware({
      royaltyContractInstance: royaltyContractInstance,
      address: address
    });
    console.log(allSoftware);
  }, []);
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
