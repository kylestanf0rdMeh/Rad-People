import React, {useState} from 'react';
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

const RightSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  margin-left: 45px;
  transition: all 0.55s cubic-bezier(0.25, 0.1, 0.25, 1);
`;

const ModelViewerWrapper = styled.div<{ $isActive: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease, width 0.3s ease, height 0.3s ease;
  pointer-events: none;

  ${props => props.$isActive && `
    position: static;
    transform: none;
    opacity: 1;
    width: 200px;
    height: 200px;
    margin-left: 15px;
    pointer-events: auto;
  `}
`;

const NavButton = styled(Link)<{ $isActive: boolean }>`
  font-family: 'Sequel Sans', sans-serif;
  font-weight: bold;
  font-size: 4vw;
  color: white;
  text-decoration: none;
  transition: transform 0.9s cubic-bezier(0.1, 0.1, 0.25, 1), 
              margin 0.55s cubic-bezier(0.25, 0.1, 0.25, 1), 
              opacity 0.3s ease;
  white-space: nowrap;
  position: relative;
  transform: ${props => props.$isActive ? 'translateX(-2vw)' : 'translateX(0)'};
  margin-right: ${props => props.$isActive ? '0' : '4vw'};
  opacity: ${props => props.$isActive ? 0 : 1};

  &:hover {
    ${props => !props.$isActive && `
      color: transparent;
      
      ${ModelViewerWrapper} {
        opacity: 1;
        width: 200%;
        height: 200%;
      }

      model-viewer {
        opacity: 1 !important;
      }
    `}
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
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

  return (
    <NavBarContainer>
      <LeftSection>
        <LeftText>LET'S</LeftText>
        {activeItemId !== null && (
          <ModelViewerWrapper $isActive={true}>
            <model-viewer
              src={`/3D/${navItems.find(item => item.id === activeItemId)?.label.toLowerCase()}.glb`}
              alt={`3D ${navItems.find(item => item.id === activeItemId)?.label}`}
              disable-tap
              disable-zoom
              auto-rotate
              rotation-per-second="36deg"
              interaction-prompt="none"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </ModelViewerWrapper>
        )}
      </LeftSection>
      <RightSection>
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            to={item.to}
            onClick={() => {
              handleNavClick(item.id);
              setActiveItemId(item.id);
            }}
            $isActive={item.id === activeItemId}
          >
            {item.label}
            <ModelViewerWrapper $isActive={false}>
              <model-viewer
                src={`/3D/${item.label.toLowerCase()}.glb`}
                alt={`3D ${item.label}`}
                camera-controls={false}
                disable-tap
                disable-zoom
                auto-rotate={false}
                interaction-prompt="none"
                style={{
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                }}
              />
            </ModelViewerWrapper>
          </NavButton>
        ))}
      </RightSection>
    </NavBarContainer>
  );
};

export default NavBar;