import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import '@google/model-viewer';
import { motion, AnimatePresence } from 'framer-motion';

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
  overflow: hidden; // Prevent scrolling
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const LeftText = styled.span`
  font-family: 'Sequel Sans', sans-serif;
  font-weight: bold;
  font-size: 3vw;
  color: white;
  white-space: nowrap;
`;

const RightSection = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-grow: 1;
  margin-left: 45px;
  overflow-x: hidden;
  overflow: hidden; // Prevent scrolling

`;

const NavButtonsContainer = styled(motion.div)`
  display: flex;
  width: 100%;
  position: relative;
  height: 80px; // Adjust this value based on your button height
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

const NavButton = styled(motion(Link))<{ $isActive: boolean }>`
  font-family: 'Sequel Sans', sans-serif;
  font-weight: bold;
  font-size: 3vw;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px 10px;
  position: absolute;
  transition: color 0.3s ease, opacity 0.3s ease;
  outline: none;
  width: 25%;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:hover {
    color: transparent;

    ${ModelViewerWrapper} {
      opacity: 1;
    }
  }

  &::after {
    content: none;
  }
`;

const buttonVariants = {
  initial: (custom: number) => ({
    x: `${custom * 100}%`,
    opacity: 1
  }),
  animate: (custom: number) => ({
    x: `${custom * 140}%`,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30
    }
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

interface NavItem {
  id: number;
  to: string;
  label: string;
}

interface NavBarProps {
  navItems: NavItem[];
  handleNavClick: (clickedId: number) => void;
}

const NavBar: React.FC<NavBarProps> = ({ navItems, handleNavClick }) => {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [activeItemId]);

  const getOrderedItems = () => {
    if (activeItemId === null) return navItems;
    const activeIndex = navItems.findIndex(item => item.id === activeItemId);
    return [
      ...navItems.slice(activeIndex + 1),
      ...navItems.slice(0, activeIndex)
    ];
  };

  return (
    <NavBarContainer>
      <LeftSection>
        <LeftText>LET'S</LeftText>
        <AnimatePresence>
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
        </AnimatePresence>
      </LeftSection>
      <RightSection ref={containerRef}>
        <NavButtonsContainer>
          <AnimatePresence initial={false}>
            {getOrderedItems().map((item, index) => (
              <NavButton
              key={item.id}
              $isActive={item.id === activeItemId}
              to={item.to}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
                setActiveItemId(item.id);
                setTimeout(() => {
                  navigate(item.to);
                }, 100); // Adjust this delay as needed
              }}
              onMouseDown={(e) => e.preventDefault()}
              custom={index}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              exit="exit"
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
                  }}
                />
              </ModelViewerWrapper>
            </NavButton>
            ))}
          </AnimatePresence>
        </NavButtonsContainer>
      </RightSection>
    </NavBarContainer>
  );
};

export default NavBar;