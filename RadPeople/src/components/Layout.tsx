import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLayout = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  min-width: 320px;
  overflow-x: hidden;
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

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
    gap: 20px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 14px;
  padding: 10px;
  width: calc(50% - 5px);
  text-align: center;
  background-color: #f0f0f0;
  border-radius: 5px;

  &:hover {
    color: #007bff;
    background-color: #e0e0e0;
  }

  @media (min-width: 768px) {
    font-size: 16px;
    width: auto;
    background-color: transparent;
    padding: 5px 10px;
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
        <Nav>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/products">Products</StyledLink>
          <StyledLink to="/gallery">Gallery</StyledLink>
          <StyledLink to="/events">Events</StyledLink>
        </Nav>
      </Header>
      <Main>{children}</Main>
    </StyledLayout>
  );
};

export default Layout;