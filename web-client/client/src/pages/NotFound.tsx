import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import Grid from '../components/common/Grid';
import { TitleArea, TextArea } from '../components/common/GridAreas';
import Container from '../components/common/Container';
import Background from '../components/common/Background';

const H1 = styled.h1`
  font-family: 'nowaythin';
  margin: 0.65em 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primaryDark};
`;

const NotFound: React.FC = () => {
  let location = useLocation();
  return (
    <Background>
      <Grid>
        <TitleArea>
          <Container width="90%">
            <H1>Page not found: Error 404</H1>
          </Container>
        </TitleArea>
        <TextArea>
          <Container width="90%">
            <p>
              Sorry, the page you were looking for at{' '}
              <code>hansenlin.com{location.pathname}</code> was not found.
            </p>
          </Container>
        </TextArea>
      </Grid>
    </Background>
  );
};

export default NotFound;
