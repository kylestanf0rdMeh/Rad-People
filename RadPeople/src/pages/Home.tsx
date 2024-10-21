import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import IntroAnimation from '../components/IntroAnimation';
import VideoBackground from '../components/VideoBackground';
import { HomeContainer } from '../styles/HomeStyles';

const Home: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HomeContainer>
      {showIntro && <IntroAnimation />}
      <Layout>
        <VideoBackground />
      </Layout>
    </HomeContainer>
  );
};

export default Home;