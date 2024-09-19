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
  font-family: 'Sequel Sans', sans-serif;
  font-weight: bold;
  // font-family: 'NF Ultra', sans-serif;
  // font-weight: normal;
  font-size: 52px;
  color: white;
  white-space: nowrap;
`;

const ModelViewerWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin-left: 20px;
`;

const NavButton = styled(Link)`
  font-family: 'Sequel Sans', sans-serif;
  font-weight: bold;
  // font-family: 'NF Ultra', sans-serif;
  // font-weight: normal;
  font-size: 52px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
  padding: 10px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const NavBar: React.FC = () => {
  return (
    <NavBarContainer>
      <LeftSection>LET'S</LeftSection>
      <ModelViewerWrapper>
        <model-viewer
          src="/fonts/trash_italic.gltf"
          alt="Placeholder"
          disable-tap
          disable-zoom
          auto-rotate
          rotation-per-second="30deg"
          // camera-controls
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </ModelViewerWrapper>
      <RightSection>
        <NavButton to="/events">EVENTS</NavButton>
        <NavButton to="/gallery">GALLERY</NavButton>
        <NavButton to="/products">SHOP</NavButton>
        <NavButton to="/info">INFO</NavButton>
      </RightSection>
    </NavBarContainer>
  );
};

export default NavBar;