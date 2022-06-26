import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import Grid from '../../components/common/Grid';
import { TitleArea, TextArea } from '../../components/common/GridAreas';
import Container from '../../components/common/Container';
import Background from '../../components/common/Background';
import Link from '../../components/common/Link';

import MintForm from './MintForm';

const H1 = styled.h1`
  font-family: 'nowaythin';
  margin: 0.65em 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primaryDark};
`;
interface Props {
  address: string;
  royaltyContractInstance: any;
}

const Create: React.FC<Props> = ({address, royaltyContractInstance}) => {
  return (
    <Background>
      <Grid>
        <TitleArea>
          <Container width="90%">
            <H1>Mint New Project</H1>
          </Container>
        </TitleArea>
        <TextArea>
          <Container width="90%">
            <MintForm address={address} royaltyContractInstance={royaltyContractInstance}/>
          </Container>
        </TextArea>
      </Grid>
    </Background>
  );
};

export default Create;
