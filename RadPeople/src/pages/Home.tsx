import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import IntroAnimation from '../components/IntroAnimation';
import { HomeContainer, Hero, CenteredText } from '../styles/HomeStyles';

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
          <CenteredText>
            <span>Let's Create</span>
            <span>Something</span>
            <span>Special</span>
            <span>Together</span>
          </CenteredText>
        </Hero>
      </Layout>
    </HomeContainer>
  );
};

export default Home;