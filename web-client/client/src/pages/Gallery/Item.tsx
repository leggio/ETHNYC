import React from 'react';
import styled from 'styled-components';
import placeholder from '@assets/images/placeholder.png';

import { Link, useNavigate } from 'react-router-dom';

export const ItemArea = styled.div`
  flex: 0 1 10.8em;
  color: ${({ theme }) => theme.colors.primaryDark};
  border: 1px solid ${({ theme }) => theme.colors.primaryDark};
  height: 10.8em;

  /* ${({ theme }) => theme.media.tablet`
    border: 1px solid ${theme.colors.primaryDark};
  `} */
`;

const Image = styled.img`
  width: 100%;
  margin: auto;
`;

Image.defaultProps = {
  src: placeholder
};

interface Props {
  readonly id: string;
}

const Item: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  const toDetailComponent = () => {
    navigate(`/software/${id}`, { state: { id: id, name: 'sabaoon' } });
  };
  return (
    <ItemArea>
      <Image
        onClick={() => {
          toDetailComponent();
        }}
      />
    </ItemArea>
  );
};

export default Item;
