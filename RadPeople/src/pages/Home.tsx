import Layout from '../components/Layout';
import React, { useState, useEffect } from 'react';
import IntroAnimation from '../components/IntroAnimation';
import { HomeContainer, Hero, CenteredText } from '../styles/HomeStyles';

const Home: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 7000); // Increased from 5000 to 7000
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