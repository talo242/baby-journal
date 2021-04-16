import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Colors from '../Colors';

interface LoginLayoutProps {
  children: React.ReactNode;
}

const Background = styled.div`
  background-color: ${Colors.primaryLighter};
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 560px;
  padding: 56px;
  background: #ffffff;
  box-shadow: 8px 12px 24px rgba(84, 146, 228, 0.12);
  border-radius: 8px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Subtitle = styled.p`
  margin-top: 16px;
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.gray};
`;

const LogoContainer = styled.div`
  margin-top: 16px;
`

const LoginLayout = (props) => {
  const { children } = props;
  return (
    <Background>
      <Container>
        <ImageContainer>
          <Image src="/icon.svg" alt="icon" width="76" height="76" />
          <LogoContainer>
            <Image src="/logo.svg" alt="babydo logo" width="180" height="46" />
          </LogoContainer>
          <Subtitle>Easily keep track of your baby’s routine</Subtitle>
        </ImageContainer>
        {children}
      </Container>
    </Background>
  );
};

export default LoginLayout;
