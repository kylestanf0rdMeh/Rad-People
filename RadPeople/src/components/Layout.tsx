import React from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  min-width: 320px;
  overflow-x: hidden;
  padding-bottom: 140px; // Increased to make room for the NavBar
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 40px;
  }
`;

const Logo = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;

  @media (min-width: 768px) {
    margin-bottom: 0;
    text-align: left;
  }
`;

const Main = styled.main`
  padding-top: 20px;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <StyledLayout>
      <Header>
        <Logo>RadPeople</Logo>
      </Header>
      <Main>{children}</Main>
    </StyledLayout>
  );
};

export default Layout;