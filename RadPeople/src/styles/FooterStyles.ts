import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BLUE_COLOR = '#1404FB';

export const FooterContainer = styled.footer`
  margin-top: 1px;
  border-top: 1px solid #000000;
  background-color: ${BLUE_COLOR};
  padding: 0 max(5px, calc((100vw - 100%) / 2));
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  max-width: 100vw;
  overflow: hidden; // Prevent content from spilling out
`;

export const SocialLinksColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 50px 0;
`;

export const SocialLink = styled(Link)<{ $isHomePage: boolean }>`
  font-family: 'NF Ultra', sans-serif;
  font-size: 17px;
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;

  ${props => props.$isHomePage && `
    @media (max-width: 480px) {
        color: white;
        opacity: 0.9;
    }

    &:hover {
      opacity: 0.9;
      color: #1404FB;
    }
  `}
`;

export const ArrowIcon = styled.span`
  display: inline-flex;
  align-items: center;
  transform: rotate(45deg);
  font-size: 22px;
  margin-left: 4px;

  svg {
    stroke-width: 1;
  }
`;

export const Copyright = styled.div`
  font-family: 'Helvetica Neue LT Com', sans-serif;
  font-size: 90px;
  text-transform: uppercase;
  color: white;
  margin-right: 20px;
  padding: 35px 0 20px 0; // Top padding to create space

  @media (max-width: 768px) {
    font-size: 80px;
    padding: 35px 0 20px 0; // Reduced top padding for mobile
  }

  @media (max-width: 480px) {
    font-size: 55px;
    padding: 60px 0 20px 0; // Even less top padding for smaller devices
  }
`;