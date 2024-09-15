import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import ThreeDObject from '../components/ThreeDObject';

const Hero = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const ThreeWrapper = styled.div`
  height: 400px;
  margin-bottom: 40px;
`;

const Home: React.FC = () => {
  return (
    <Layout>
      <Hero>
        <h1>Welcome to RadPeople</h1>
        <p>Discover our amazing products and events!</p>
      </Hero>
      <ThreeWrapper>
        <ThreeDObject />
      </ThreeWrapper>
    </Layout>
  );
};

export default Home;