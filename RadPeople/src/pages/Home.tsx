import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import IntroAnimation from '../components/IntroAnimation';
import { HomeContainer, Hero, Title, Subtitle } from '../styles/HomeStyles';

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
      </Layout>
    </HomeContainer>
  );
};

export default Home;