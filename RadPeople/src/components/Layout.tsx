import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLayout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  &:hover {
    color: #007bff;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <StyledLayout>
      <Header>
        <h1>RadPeople</h1>
        <Nav>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/products">Products</StyledLink>
          <StyledLink to="/gallery">Gallery</StyledLink>
          <StyledLink to="/events">Events</StyledLink>
        </Nav>
      </Header>
      <main>{children}</main>
    </StyledLayout>
  );
};

export default Layout;