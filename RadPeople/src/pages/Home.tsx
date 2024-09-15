import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import ThreeDObject from '../components/ThreeDObject';
import IntroAnimation from '../components/IntroAnimation';

const Hero = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const ThreeWrapper = styled.div`
  height: 400px;
  margin-bottom: 40px;
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
          <h1>Welcome to RadPeople</h1>
          <p>Discover our amazing products and events!</p>
        </Hero>
        <ThreeWrapper>
          <ThreeDObject />
        </ThreeWrapper>
      </Layout>
    </>
  );
};

export default Home;