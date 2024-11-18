import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';

const StyledLayout = styled.div`
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  min-width: 320px;
  overflow-x: hidden;
  min-height: 100vh; // Changed from height to min-height
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <StyledLayout>
      <Main>{children}</Main>
      <Footer />
    </StyledLayout>
  );
};

export default Layout;