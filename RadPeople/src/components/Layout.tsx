import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLayout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
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

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;

  @media (min-width: 768px) {
    gap: 20px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 14px;
  padding: 5px 10px;

  &:hover {
    color: #007bff;
  }

  @media (min-width: 768px) {
    font-size: 16px;
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