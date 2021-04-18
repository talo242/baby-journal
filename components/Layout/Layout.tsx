import Header from '../Header';
import styled from 'styled-components';
import Colors from '../Colors';

const OuterContainer = styled.div`
  background-color: ${Colors.primaryLighter};
  min-height: 100vh;
`

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  margin: auto;
  padding-top: 32px;
`;

export const InnerContainer = styled.div`
  display: flex;
`

const Layout = (props) => {
  const { children } = props;
  return (
    <OuterContainer>
      <Header />
      <Container>{children}</Container>
    </OuterContainer>
  );
};

export default Layout;
