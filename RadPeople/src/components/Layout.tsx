import React from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  min-width: 320px;
  overflow-x: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <StyledLayout>
      <Main>{children}</Main>
    </StyledLayout>
  );
};

export default Layout;