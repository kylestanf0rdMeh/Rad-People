import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ThreeDObject from '../components/ThreeDObject';
import IntroAnimation from '../components/IntroAnimation';
import { HomeContainer, Hero, ThreeWrapper, Title, Subtitle } from '../styles/HomeStyles';

const Home: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 5000); // Adjust time as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <HomeContainer>
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
    </HomeContainer>
  );
};

export default Home;