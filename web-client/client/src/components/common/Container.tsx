import styled from 'styled-components';

interface Props {
  readonly width: string;
  readonly gridAreaName?: string;
}

const Container = styled.div<Props>`
  width: ${(props) => props.width};
  margin: auto;
  grid-area: ${(props) => props.gridAreaName};
`;

export default Container;
