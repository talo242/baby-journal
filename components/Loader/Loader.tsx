import React from 'react';
import Spinner from '../Icons/Spinner';
import styled from 'styled-components';
import Colors from '../Colors';

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <Spinner color={Colors.primary} width="32" height="32" />
    </LoaderContainer>
  );
};

export default Loader;
