import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import ThreeDObject from '../components/ThreeDObject';
import IntroAnimation from '../components/IntroAnimation';

const Hero = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding: 0 20px;
`;

const ThreeWrapper = styled.div`
  height: 300px;
  margin-bottom: 20px;
  
  @media (min-width: 768px) {
    height: 400px;
    margin-bottom: 40px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  
  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const Home: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 5000); // Adjust time as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showIntro && <IntroAnimation />}
      <Layout>
        <Hero>
          <Title>Welcome to RadPeople</Title>
          <Subtitle>Discover our amazing products and events!</Subtitle>
        </Hero>
        <ThreeWrapper>
          <ThreeDObject />
        </ThreeWrapper>
      </Layout>
    </>
  );
};

export default Home;