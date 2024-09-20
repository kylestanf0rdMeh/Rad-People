import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '@google/model-viewer';

const NavBarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #1404FB;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const LeftText = styled.span`
  font-family: 'Sequel Sans', sans-serif;
  font-weight: bold;
  font-size: 52px;
  color: white;
  white-space: nowrap;
`;

const ModelViewerWrapper = styled.div`
  width: 180px;
  height: 180px;
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  margin-left: 45px;
  transition: all 0.55s cubic-bezier(0.25, 0.1, 0.25, 1);
`;

const NavButton = styled(Link)<{ $isActive: boolean }>`
  font-family: 'Sequel Sans', sans-serif;
  font-weight: bold;
  font-size: 52px;
  color: white;
  text-decoration: none;
  transition: transform 0.9s cubic-bezier(0.1, 0.1, 0.25, 1), 
              margin 0.55s cubic-bezier(0.25, 0.1, 0.25, 1), 
              font-style 0.3s ease;
  white-space: nowrap;
  transform: ${props => props.$isActive ? 'translateX(-2vw)' : 'translateX(0)'};
  margin-right: ${props => props.$isActive ? '0' : '4vw'};

  &:hover {
    font-style: italic;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: white;
    transform: scaleX(${props => props.$isActive ? 1 : 0});
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

interface NavItem {
  id: number;
  to: string;
  label: string;
}

interface NavBarProps {
  navItems: NavItem[];
  handleNavClick: (clickedId: number) => void;
}

const NavBar: React.FC<NavBarProps> = ({ navItems = [], handleNavClick }) => {
  return (
    <NavBarContainer>
      <LeftSection>
        <LeftText>LET'S</LeftText>
        <ModelViewerWrapper>
          <model-viewer
            src="/3D/create.glb"
            // src="/3D/shop.glb"
            alt="Placeholder"
            disable-tap
            disable-zoom
            auto-rotate
            rotation-per-second="36deg"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </ModelViewerWrapper>
      </LeftSection>
      <RightSection>
        {navItems.map((item, index) => (
          <NavButton
            key={item.id}
            to={item.to}
            onClick={() => handleNavClick(item.id)}
            $isActive={index === 0}
          >
            {item.label}
          </NavButton>
        ))}
      </RightSection>
    </NavBarContainer>
  );
};

export default NavBar;