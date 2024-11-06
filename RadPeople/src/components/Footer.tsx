import React from 'react';
import { useLocation } from 'react-router-dom';
import { IoArrowUpOutline } from "react-icons/io5";
import {
  FooterContainer,
  SocialLinksColumn,
  SocialLink,
  ArrowIcon,
  Copyright
} from '../styles/FooterStyles';

const Footer: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <FooterContainer>
      <SocialLinksColumn>
        <SocialLink to="mailto:contact@radpeople.us" $isHomePage={isHomePage}>
            <ArrowIcon><IoArrowUpOutline /></ArrowIcon> Email 
        </SocialLink>
        <SocialLink to="https://instagram.com/radpeople.rp" target="_blank" rel="noopener noreferrer" $isHomePage={isHomePage}>
            <ArrowIcon><IoArrowUpOutline /></ArrowIcon> Instagram 
        </SocialLink>
        <SocialLink to="https://twitter.com/radpeople" target="_blank" rel="noopener noreferrer" $isHomePage={isHomePage}>
            <ArrowIcon><IoArrowUpOutline /></ArrowIcon> Twitter
        </SocialLink>
      </SocialLinksColumn>
      
      <Copyright>&copy;2024</Copyright>
    </FooterContainer>
  );
};

export default Footer;